import { mapValues, pickBy } from 'lodash-es';
import { hasProp } from '../nulls.js';
import { asyncMapValues } from '../async.js';
const ecrRegex = /^(?<registry>[0-9]+\.dkr\.ecr\.[^.]+\.*\.amazonaws\.com)\/(?<singleName>.+)/;
export const parseRegistry = ({ registry, singleName }) => {
    if (singleName === undefined) {
        const match = ecrRegex.exec(registry);
        if (match) {
            return match.groups;
        }
    }
    return { registry, singleName: typeof singleName === 'string' ? singleName : undefined };
};
const plainImageRefFactory = ({ image, tag }) => `${image}:${tag}`;
const registryImageRefFactory = ({ registry, singleName }) => (singleName
    ? ({ image, tag }) => `${registry}/${singleName}:${image}-${tag}`
    : ({ image, tag }) => `${registry}/${image}:${tag}`);
export const generateBuild = async ({ composeModel, buildSpec, machineDockerPlatform, imageTagCalculator, }) => {
    const imageRef = buildSpec.registry
        ? registryImageRefFactory(buildSpec.registry)
        : plainImageRefFactory;
    const imageRefForService = (service, tag) => imageRef({
        image: `preevy-${composeModel.name}-${service}`,
        tag,
    });
    const services = await asyncMapValues(pickBy(composeModel.services ?? {}, hasProp('build')), async ({ build, image }, serviceName) => {
        const latestImage = imageRefForService(serviceName, 'latest');
        const serviceTagSuffix = await imageTagCalculator(build);
        const thisImage = imageRefForService(serviceName, serviceTagSuffix);
        const cacheFrom = build.cache_from ?? [];
        const cacheTo = build.cache_to ?? [];
        const tags = build.tags ?? [];
        if (buildSpec.registry && buildSpec.cacheFromRegistry) {
            cacheTo.push(`type=registry,ref=${latestImage},mode=max,oci-mediatypes=true,image-manifest=true`);
            cacheFrom.push(latestImage);
            cacheFrom.push(thisImage);
        }
        tags.push(latestImage);
        tags.push(thisImage);
        return {
            image: image ?? thisImage,
            build: {
                ...build,
                tags,
                cache_from: cacheFrom,
                cache_to: cacheTo,
            },
        };
    });
    const buildModel = { name: composeModel.name, services };
    const createBakeArgs = (modelFilename) => [
        '-f', modelFilename,
        ...buildSpec.registry ? ['--push'] : ['--load'],
        ...buildSpec.builder ? [`--builder=${buildSpec.builder}`] : [],
        ...buildSpec.noCache ? ['--no-cache'] : [],
        `--set=*.platform=${machineDockerPlatform}`,
    ];
    const deployModel = {
        ...composeModel,
        services: {
            ...mapValues(composeModel.services, (service, serviceName) => ({
                ...service,
                image: buildModel.services?.[serviceName]?.image ?? service.image,
            })),
        },
    };
    return { buildModel, createBakeArgs, deployModel };
};
//# sourceMappingURL=index.js.map