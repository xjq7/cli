#! /usr/bin/env node
import { program } from 'commander';
import packageJson from '../package.json';
import { create } from '../src/create';

program
  .command('create <project-name>')
  .description('create a new project')
  .option('-f, --force', "overwrite if it's exist")
  .action((name, cmd) => {
    create(name);
  });

program.name('jqcli').description('cli tools').version(packageJson.version, '-v, --version');

program.parse(process.argv);
