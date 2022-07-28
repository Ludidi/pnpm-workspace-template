import type { Argv } from 'yargs';
import factory from '.';

const builder = (yargs: Argv) => {
  yargs.positional('package-name', {
    type: 'string',
    description: 'package name',
  });
  return yargs;
};

const handler = async (args: any) => {
  return factory(args);
};

export default {
  command: 'create <package-name>',
  describe: '创建一个新的项目模板',
  builder,
  handler,
};
