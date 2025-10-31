import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { detectFramework } from './detect.js';
import { getPrompts, getDefaultConfig } from './prompts.js';
import { loadTemplates, renderTemplate } from './templates.js';

export async function initMemorySystem(options = {}) {
  const cwd = process.cwd();
  const spinner = ora();

  // Step 1: Check if files exist
  const existingFiles = checkExistingFiles(cwd);
  if (existingFiles.length > 0 && !options.force) {
    console.log(chalk.yellow('\n⚠️  Warning: These files already exist:'));
    existingFiles.forEach(file => console.log(chalk.yellow(`  - ${file}`)));
    
    const { overwrite } = await inquirer.prompt([{
      type: 'confirm',
      name: 'overwrite',
      message: 'Overwrite existing files?',
      default: false
    }]);
    
    if (!overwrite) {
      console.log(chalk.gray('\n👋 Setup cancelled.'));
      return;
    }
  }

  // Step 2: Detect framework
  spinner.start('Analyzing your project...');
  const detected = await detectFramework(cwd);
  spinner.succeed(chalk.green(`Detected: ${chalk.bold(detected.name)}`));

  // Step 3: Get configuration
  let config;
  if (options.yes) {
    config = getDefaultConfig(detected, options.framework);
  } else {
    console.log(); // Empty line
    config = await inquirer.prompt(getPrompts(detected));
  }

  // Step 4: Load templates
  spinner.start('Loading templates...');
  const templates = await loadTemplates(config.framework);
  spinner.succeed('Templates loaded');

  // Step 5: Generate files
  spinner.start('Creating documentation files...');
  const files = {
    'AGENTS.md': renderTemplate(templates.agents, config, detected),
    'PROGRESS.md': renderTemplate(templates.progress, config, detected),
    'technical_overview.md': renderTemplate(templates.technical, config, detected)
  };

  for (const [filename, content] of Object.entries(files)) {
    writeFileSync(join(cwd, filename), content, 'utf8');
  }
  spinner.succeed(chalk.green('Files created successfully!'));

  // Step 6: Show success message
  displaySuccess(config);
}

function checkExistingFiles(cwd) {
  const files = ['AGENTS.md', 'PROGRESS.md', 'technical_overview.md'];
  return files.filter(f => existsSync(join(cwd, f)));
}

function displaySuccess(config) {
  console.log(chalk.green.bold('\n✅ Success! AI Memory System is ready.\n'));
  
  console.log(chalk.white('📁 Files created:'));
  console.log(chalk.cyan('  ├─ AGENTS.md') + chalk.gray(' (Development guidelines)'));
  console.log(chalk.cyan('  ├─ PROGRESS.md') + chalk.gray(' (Project history - update before commits!)'));
  console.log(chalk.cyan('  └─ technical_overview.md') + chalk.gray(' (Architecture docs)'));
  
  console.log(chalk.white('\n🤖 Tell your AI:'));
  console.log(chalk.gray('  "Read the 3 memory files (AGENTS.md, PROGRESS.md, technical_overview.md)'));
  console.log(chalk.gray('   before starting any task. Update PROGRESS.md before committing."'));
  
  console.log(chalk.white('\n📝 Next steps:'));
  console.log(chalk.yellow('  1. Review and customize the generated files'));
  console.log(chalk.yellow('  2. git add AGENTS.md PROGRESS.md technical_overview.md'));
  console.log(chalk.yellow('  3. git commit -m "docs: add AI Memory System"'));
  console.log(chalk.yellow('  4. Update PROGRESS.md after each change'));
  
  console.log(chalk.white('\n💡 Pro tip:'));
  console.log(chalk.gray('  Add to .cursorrules: "Always reference AGENTS.md, PROGRESS.md, technical_overview.md"'));
  
  console.log(chalk.white('\n📖 Documentation:'));
  console.log(chalk.blue('  https://github.com/vibedevid-vip/ai-memory\n'));
}
