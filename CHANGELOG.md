# Changelog

All notable changes to this project will be documented in this file.

## [1.1.1] - 2025-10-31

### Changed
- **AGENTS.md Template Improvements**: 
  - Reduced to ≤150 lines following best practices
  - Concrete commands wrapped in backticks (copy-paste ready)
  - Added verification checklist before merge
  - Clear step-by-step workflow
  - Best practices section included
- **technical_overview.md Template Improvements**:
  - Starts with AI analysis prompt for automated generation
  - Structured sections: Core Components, Interactions, Deployment, Runtime
  - Includes code snippet examples
  - More actionable and less placeholder-heavy

### Benefits
- Templates are now automation-first (no manual placeholder filling)
- Follows industry best practices for agent guidelines
- AI agents can self-populate technical_overview.md using provided prompt

## [1.1.0] - 2025-10-31

### Added
- **AI_PROMPT.md Auto-Generation**: Now creates a 4th file with ready-to-use AI prompt
- No placeholders - fully automated with actual project info (name, framework, description)
- Users just copy-paste to their AI agent - zero manual editing
- Improved CLI output with clear setup instructions

### Changed
- Updated success message to highlight AI_PROMPT.md
- Simplified next steps (removed manual customization requirement)

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
