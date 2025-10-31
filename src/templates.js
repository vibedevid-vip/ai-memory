import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatesDir = join(__dirname, '../templates');

export async function loadTemplates(framework) {
  // Load base templates
  const agents = readFileSync(
    join(templatesDir, 'base', 'AGENTS.md'),
    'utf8'
  );
  const progress = readFileSync(
    join(templatesDir, 'base', 'PROGRESS.md'),
    'utf8'
  );
  const technical = readFileSync(
    join(templatesDir, 'base', 'technical.md'),
    'utf8'
  );

  return { agents, progress, technical };
}

export function renderTemplate(template, config, detected) {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let content = template
    .replace(/\[PROJECT_NAME\]/g, config.projectName)
    .replace(/\[DESCRIPTION\]/g, config.description)
    .replace(/\[REPO_URL\]/g, config.repoUrl || 'Not specified')
    .replace(/\[DATE\]/g, date)
    .replace(/\[FRAMEWORK_NAME\]/g, detected.name)
    .replace(/\[FRAMEWORK\]/g, config.framework);

  return content;
}
