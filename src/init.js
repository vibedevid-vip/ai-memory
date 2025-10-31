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
    'technical_overview.md': renderTemplate(templates.technical, config, detected),
    'AI_PROMPT.md': generateAIPrompt(config, detected)
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
  console.log(chalk.cyan('  ├─ technical_overview.md') + chalk.gray(' (Architecture docs)'));
  console.log(chalk.cyan('  └─ AI_PROMPT.md') + chalk.gray(' (Ready-to-use AI prompt)'));
  
  console.log(chalk.white('\n🤖 Setup Your AI Agent:'));
  console.log(chalk.green.bold('  1. Open AI_PROMPT.md'));
  console.log(chalk.green.bold('  2. Copy entire content'));
  console.log(chalk.green.bold('  3. Paste to your AI agent'));
  console.log(chalk.gray('     No editing needed - it\'s ready to use!'));
  
  console.log(chalk.white('\n📝 Next steps:'));
  console.log(chalk.yellow('  1. git add AGENTS.md PROGRESS.md technical_overview.md AI_PROMPT.md'));
  console.log(chalk.yellow('  2. git commit -m "docs: add AI Memory System"'));
  console.log(chalk.yellow('  3. Start coding - your AI has perfect memory now!'));
  
  console.log(chalk.white('\n💡 Pro tip:'));
  console.log(chalk.gray('  Update PROGRESS.md before every commit to maintain memory'));
  
  console.log(chalk.white('\n📖 Documentation:'));
  console.log(chalk.blue('  https://github.com/vibedevid-vip/ai-memory\n'));
}

function generateAIPrompt(config, detected) {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return `# 🤖 AI Agent Setup Prompt

**Copy this entire file and paste it into your AI agent (Cursor, Copilot, Claude, ChatGPT, etc.)**

---

## Project Context

You are working on **${config.projectName}** - ${config.description}

**Framework:** ${detected.name}  
**Setup Date:** ${date}  
${config.repoUrl ? `**Repository:** ${config.repoUrl}` : ''}

---

## AI Memory System

This project uses a **3-file memory system** to give you perfect context and memory across all sessions.

### CRITICAL: Read These Files Before Every Task

**You MUST read these 3 files in order before starting any work:**

1. **AGENTS.md** - Development guidelines, tech stack, commands, and code conventions
2. **technical_overview.md** - System architecture, component interactions, and design decisions  
3. **PROGRESS.md** - Project history, completed features, current status, and known issues

### Workflow for Every Task

\`\`\`
1. Read AGENTS.md (how to code in this project)
2. Read technical_overview.md (understand the architecture)
3. Read PROGRESS.md (know what's been built and current state)
4. Implement the requested feature/fix
5. Test thoroughly
6. Update PROGRESS.md with:
   - What was accomplished
   - Files modified/created
   - Testing results
   - Any important notes
7. Commit and push
\`\`\`

### Non-Negotiable Rules

- ✅ **ALWAYS read all 3 memory files before starting work** - No exceptions
- ✅ **MUST update PROGRESS.md before every commit** - This maintains the memory system
- ✅ **Follow patterns in AGENTS.md** - Consistency is critical
- ✅ **Document significant changes** - Future you (and AI) will thank you

### Why This Matters

**Without reading the memory files:**
- ❌ You'll break established conventions
- ❌ You'll repeat past mistakes
- ❌ Code will be inconsistent
- ❌ Context will be lost between sessions

**With the memory system:**
- ✅ Perfect consistency across all sessions
- ✅ Never repeat mistakes
- ✅ Complete project context always available
- ✅ New features integrate seamlessly

---

## Quick Reference

**Before coding:** Read AGENTS.md → technical_overview.md → PROGRESS.md  
**After coding:** Update PROGRESS.md → Commit

**Memory files location:**
- \`./AGENTS.md\`
- \`./PROGRESS.md\`
- \`./technical_overview.md\`

---

**This prompt was generated by [@vibedevid/ai-memory](https://www.npmjs.com/package/@vibedevid/ai-memory)**

*You can now start working with complete project context and memory!* 🧠
`;
}
