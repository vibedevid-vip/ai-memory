import { basename } from 'path';

export function getPrompts(detected) {
  return [
    {
      type: 'input',
      name: 'projectName',
      message: '📦 Project name:',
      default: basename(process.cwd())
    },
    {
      type: 'input',
      name: 'description',
      message: '📝 Brief description:',
      default: 'A modern web application'
    },
    {
      type: 'list',
      name: 'framework',
      message: '🛠️  Select framework:',
      default: detected.framework,
      choices: [
        { name: 'Next.js', value: 'nextjs' },
        { name: 'React', value: 'react' },
        { name: 'Vue.js', value: 'vue' },
        { name: 'Express', value: 'express' },
        { name: 'Django', value: 'django' },
        { name: 'Flask', value: 'flask' },
        { name: 'Generic/Other', value: 'generic' }
      ]
    },
    {
      type: 'input',
      name: 'repoUrl',
      message: '🔗 GitHub repo URL (optional):',
      default: ''
    }
  ];
}

export function getDefaultConfig(detected, frameworkOverride = null) {
  return {
    projectName: basename(process.cwd()),
    description: 'A modern web application',
    framework: frameworkOverride || detected.framework,
    repoUrl: ''
  };
}
