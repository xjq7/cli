import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer';
import { downloadGitRepo } from '../lib/download';

enum TemplateType {
  'cli' = 'cli',
  'react-webpack-ts' = 'react-webpack-ts',
  'react-vite-ts' = 'react-vite-ts',
  'vitepress' = 'vitepress',
}

// const templateSource = {
//   cli: '',
//   'react-webpack-ts': '',
// };

interface CreateProjectOptions {
  template: TemplateType;
}

export async function createProject(name: string, options: CreateProjectOptions) {
  const { template } = options;
  try {
    await downloadGitRepo(`github:xjq7/template#${template}`, name, { clone: false });
  } catch (error) {
    console.log(error);
  }
}

export async function create(name: string) {
  const root = process.cwd();
  const targetDir = path.join(root, name);

  if (fs.existsSync(targetDir)) {
    const { force } = await inquirer.prompt({
      type: 'confirm',
      name: 'force',
      message: 'Would you like overwrite it?',
    });
    if (force) {
      fs.rmSync(targetDir, { recursive: true, force: true });
    } else {
      process.exit();
    }
  }
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: "What's your project type?",
      choices: ['package', 'website', 'docs'],
    },
  ]);

  let template;

  if (type === 'package') {
    const { template: _template } = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'What template do you want?',
        choices: [TemplateType.cli],
      },
    ]);
    template = _template;
  } else if (type === 'website') {
    const { template: _template } = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'What template do you want?',
        choices: [TemplateType['react-vite-ts'], TemplateType['react-webpack-ts']],
      },
    ]);
    template = _template;
  } else if (type === 'docs') {
    const { template: _template } = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'What template do you want?',
        choices: [TemplateType.vitepress],
      },
    ]);
    template = _template;
  }

  await createProject(name, { template });
}
