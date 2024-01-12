import { Flags, Args, ux } from '@oclif/core';
import * as inquirer from '@inquirer/prompts';
import confirm from '@inquirer/confirm';
import { BaseCommand, text } from '@preevy/cli-common';
import { nextAvailableAlias } from '@preevy/core';
import { formatDriverFlagsToArgs, machineDrivers } from '../drivers.js';
import { loadProfileConfig } from '../profile-command.js';
import { chooseFs, chooseFsType } from '../fs.js';
const chooseDriver = async () => await inquirer.select({
    message: 'Which cloud provider do you want to use?',
    choices: [
        { value: 'lightsail', name: 'AWS Lightsail' },
        { value: 'gce', name: 'Google Compute Engine' },
        { value: 'azure', name: 'Microsoft Azure Virtual Machines' },
        { value: 'kube-pod', name: 'Kubernetes' },
    ],
});
const chooseAlias = async (aliases) => (await inquirer.input({
    message: 'Name of the profile',
    default: nextAvailableAlias(aliases),
    transformer: s => s.trim(),
    validate: async (input) => (aliases.includes(input) ? 'This name already exists' : true),
})).trim();
class Init extends BaseCommand {
    async run() {
        const { 'profile-alias': specifiedAlias } = this.args;
        if (this.flags.from) {
            await this.config.runCommand('profile:import', [this.flags.from, ...specifiedAlias ? ['--name', specifiedAlias] : [], '--use']);
            return undefined;
        }
        if (text.supportsColor) {
            this.log(text.logo);
        }
        const driver = await chooseDriver();
        const driverStatic = machineDrivers[driver];
        const driverFlags = await driverStatic.inquireFlags();
        ux.info(text.recommendation('To use Preevy in a CI flow, select a remote storage for your profile.'));
        const locationType = await chooseFsType(({ driver }));
        if (locationType === 'local') {
            ux.info(text.recommendation(`You can later run ${text.command(this.config, 'profile cp')} to copy your profile to a remote storage`));
        }
        const alias = specifiedAlias
            ?? await chooseAlias(Object.keys((await loadProfileConfig(this.config).list()).profiles));
        const location = await chooseFs[locationType]({
            profileAlias: alias,
            driver: { name: driver, flags: driverFlags },
        });
        await this.config.runCommand('profile:create', [
            '--use',
            '--log-level', this.flags['log-level'] ?? 'info',
            alias,
            location,
            '--driver', driver,
            ...formatDriverFlagsToArgs(driver, driverStatic.flags, driverFlags),
        ]);
        ux.info(text.recommendation('Use Livecycle together with Preevy to enable easy sharing and collaboration of your environments!'));
        if (!await confirm({
            message: 'Would you like to link this profile to a Livecycle account?',
            default: true,
        })) {
            ux.info(text.recommendation(`You can later run ${text.command(this.config, 'profile link')} to link this profile to a Livecycle account.`));
            return undefined;
        }
        await this.config.runCommand('login');
        await this.config.runCommand('profile:link');
        return undefined;
    }
}
Init.description = 'Initialize or import a new profile';
Init.args = {
    'profile-alias': Args.string({
        description: 'Name of the profile',
        required: false,
    }),
};
Init.flags = {
    from: Flags.string({
        description: 'Import profile from existing path',
    }),
};
export default Init;
//# sourceMappingURL=init.js.map