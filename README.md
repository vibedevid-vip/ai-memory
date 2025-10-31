# 🧠 AI Memory System

> Give your AI agents perfect memory in 3 files

[![npm version](https://img.shields.io/npm/v/@vibedevid/ai-memory.svg?style=flat)](https://www.npmjs.com/package/@vibedevid/ai-memory)
[![npm downloads](https://img.shields.io/npm/dm/@vibedevid/ai-memory.svg?style=flat)](https://www.npmjs.com/package/@vibedevid/ai-memory)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/vibedevid-vip/ai-memory?style=flat)](https://github.com/vibedevid-vip/ai-memory)

## What is This?

A **zero-config documentation system** that gives AI agents (Cursor, Copilot, Claude, ChatGPT) perfect memory about your project.

**3 files. 1 command. Instant context.**

## Quick Start

```bash
npx @vibedevid/ai-memory init
```

Done! ✅

## What Gets Created

1. **AGENTS.md** - Development guidelines
2. **PROGRESS.md** - Project history (update before commits!)
3. **technical_overview.md** - Architecture docs

## Why Use This?

### Before
- ❌ AI forgets context
- ❌ Inconsistent code
- ❌ Repeat same mistakes

### After
- ✅ Perfect AI memory
- ✅ Consistent patterns
- ✅ Never repeat mistakes

## Installation

### Interactive (Recommended)
```bash
npx @vibedevid/ai-memory init
```

### Quick (Use Defaults)
```bash
npx @vibedevid/ai-memory init --yes
```

### Specify Framework
```bash
npx @vibedevid/ai-memory init --framework nextjs
```

## Supported Frameworks

- ✅ Next.js
- ✅ React
- ✅ Vue.js
- ✅ Express
- ✅ Django
- ✅ Flask
- ✅ Generic (any project)

## Usage with AI Tools

### Cursor
Add to `.cursorrules`:
```
Always reference AGENTS.md, PROGRESS.md, and technical_overview.md
```

### GitHub Copilot
Add to prompt:
```
Read the 3 memory files before starting
```

### ChatGPT/Claude
Upload the 3 files and say:
```
Reference these memory files for context
```

## Real-World Results

**Before AI Memory:**
- 🔴 AI agent breaks conventions
- 🔴 Has to re-explain project every time
- 🔴 Inconsistent code across sessions

**After AI Memory:**
- 🟢 AI follows all conventions
- 🟢 Zero re-explanation needed
- 🟢 Perfect consistency

## Contributing

Found a bug? Want to add a framework?

1. Fork repo
2. Create branch
3. Submit PR

## License

MIT © VibeDev ID

---

Made with ❤️ for AI-powered development

[GitHub](https://github.com/vibedevid-vip/ai-memory) • [npm](https://www.npmjs.com/package/@vibedevid/ai-memory)
