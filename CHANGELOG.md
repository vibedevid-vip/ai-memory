# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-10-31

### Added
- Initial release of AI Memory System
- CLI with interactive and quick mode (`--yes`)
- Framework auto-detection (Next.js, React, Vue, Express, Django, Flask)
- Template system with 3 core files:
  - AGENTS.md (Development guidelines)
  - PROGRESS.md (Project history tracker)
  - technical_overview.md (Architecture documentation)
- Zero-config setup with smart defaults
- Beautiful CLI output with colors and spinners
- Overwrite protection for existing files

### Features
- `npx @vibedevid/ai-memory init` - Interactive setup
- `npx @vibedevid/ai-memory init --yes` - Quick setup
- `npx @vibedevid/ai-memory init --framework <name>` - Framework override
- Auto-detects project framework from package.json
- Generates customized templates based on detected framework

### Documentation
- Comprehensive README with examples
- MIT License
- Publishing guide for maintainers
