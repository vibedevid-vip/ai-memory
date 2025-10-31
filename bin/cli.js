#!/usr/bin/env node

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import chalk from 'chalk';
import { initMemorySystem } from '../src/init.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf8')
);

console.log(chalk.bold.cyan(`
╔═══════════════════════════════════════╗
║   🧠 AI Memory System v${packageJson.version}      ║
║   Give your AI agents perfect memory  ║
╚═══════════════════════════════════════╝
`));

const args = process.argv.slice(2);
const options = {
  yes: args.includes('--yes') || args.includes('-y'),
  framework: args.includes('--framework') || args.includes('-f') 
    ? args[args.indexOf('--framework') + 1] || args[args.indexOf('-f') + 1]
    : null
};

initMemorySystem(options).catch(error => {
  console.error(chalk.red('\n❌ Error:'), error.message);
  process.exit(1);
});
