import path from 'path';
import execa from 'execa';
import ora from 'ora';
import inquirer from 'inquirer';

class CreateCommand {
  private argv;
  private rootPath: string;

  constructor(argv: any) {
    this.argv = argv;
    this.rootPath = path.resolve();
  }

  async execute() {
    await this.ensureGenerateProject();
  }

  async ensureGenerateProject() {
    const { packageName } = this.argv;

    const { template } = await inquirer.prompt({
      type: 'list',
      name: 'template',
      message: '请选择模板类型',
      choices: ['vue3-admin'],
    });

    const spinner = ora('Template downloading...');
    try {
      spinner.start();
      await execa('git', ['clone', `http://github.com/ludidi/${template}.git`, packageName]);
      spinner.succeed('download success!');
    } catch (error) {
      spinner.fail('下载失败');
      console.error(error);
    }
  }
}

function factory(argv: any) {
  new CreateCommand(argv).execute();
}

export default factory;
