import { fsTypeFromUrl, localFsFromUrl } from '@preevy/core';
import { googleCloudStorageFs, defaultBucketName as gsDefaultBucketName, defaultProjectId as defaultGceProjectId } from '@preevy/driver-gce';
import { s3fs, defaultBucketName as s3DefaultBucketName, awsUtils, S3_REGIONS } from '@preevy/driver-lightsail';
import * as inquirer from '@inquirer/prompts';
import inquirerAutoComplete from 'inquirer-autocomplete-standalone';
var ambientAwsAccountId = awsUtils.ambientAccountId;
export const fsFromUrl = async (url, localBaseDir) => {
    const fsType = fsTypeFromUrl(url);
    if (fsType === 'local') {
        return localFsFromUrl(localBaseDir, url);
    }
    if (fsType === 's3') {
        // eslint false positive here on case-sensitive filesystems due to unknown type
        // eslint-disable-next-line @typescript-eslint/return-await
        return await s3fs(url);
    }
    if (fsType === 'gs') {
        // eslint false positive here on case-sensitive filesystems due to unknown type
        // eslint-disable-next-line @typescript-eslint/return-await
        return await googleCloudStorageFs(url);
    }
    throw new Error(`Unsupported URL type: ${fsType}`);
};
export const fsTypes = ['local', 's3', 'gs'];
export const isFsType = (s) => fsTypes.includes(s);
const defaultFsType = (driver) => {
    if (driver === 'lightsail') {
        return 's3';
    }
    if (driver === 'gce') {
        return 'gs';
    }
    return 'local';
};
export const chooseFsType = async ({ driver }) => await inquirer.select({
    message: 'Where do you want to store the profile?',
    default: defaultFsType(driver),
    choices: [
        { value: 'local', name: 'local file' },
        { value: 's3', name: 'AWS S3' },
        { value: 'gs', name: 'Google Cloud Storage' },
    ],
});
export const chooseFs = {
    local: async ({ profileAlias }) => `local://${profileAlias}`,
    s3: async ({ profileAlias, driver }) => {
        const region = await inquirerAutoComplete({
            message: 'S3 bucket region',
            source: async (input) => S3_REGIONS
                .filter(r => !input || r.includes(input.toLowerCase()))
                .map(value => ({ value })),
            default: driver?.name === 'lightsail' && S3_REGIONS.includes(driver.flags.region)
                ? driver.flags.region
                : 'us-east-1',
            suggestOnly: true,
            transformer: i => i.toLowerCase(),
        });
        const accountId = await ambientAwsAccountId(region);
        const defaultBucket = accountId ? s3DefaultBucketName({ profileAlias, accountId }) : undefined;
        const bucket = await inquirer.input({ message: 'Bucket name', default: defaultBucket });
        return `s3://${bucket}?region=${region}`;
    },
    gs: async ({ profileAlias, driver }) => {
        const defaultProject = driver?.name === 'gce'
            ? driver.flags['project-id']
            : await defaultGceProjectId();
        const project = await inquirer.input({
            message: 'Google Cloud project',
            default: defaultProject,
        });
        const defaultBucket = gsDefaultBucketName({ profileAlias, project });
        const bucket = await inquirer.input({
            message: 'Bucket name',
            default: defaultBucket,
        });
        return `gs://${bucket}?project=${project}`;
    },
};
//# sourceMappingURL=fs.js.map