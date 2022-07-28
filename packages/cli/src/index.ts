import cli from './cli';
import createCmd from './create/command';

function main(argv: any) {
  return cli().command(createCmd).parse(argv);
}

export default main;
