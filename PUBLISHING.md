# 📦 Publishing Guide - @vibedevid/ai-memory

## Prerequisites

1. **npm Account**: Login dengan akun vibedevid
   ```bash
   npm login
   ```

2. **Organization Access**: Pastikan punya akses ke @vibedevid org di npm

---

## First Time Publishing

### Step 1: Verify Package

```bash
# Check package.json valid
npm pack --dry-run

# Should show files to be included:
# - bin/
# - src/
# - templates/
# - README.md
# - LICENSE
```

### Step 2: Publish

```bash
npm publish --access public
```

---

## Update & Republish

### Patch Release (Bug fixes)
```bash
npm version patch  # 1.0.0 → 1.0.1
npm publish
git push origin main --tags
```

### Minor Release (New features)
```bash
npm version minor  # 1.0.0 → 1.1.0
npm publish
git push origin main --tags
```

### Major Release (Breaking changes)
```bash
npm version major  # 1.0.0 → 2.0.0
npm publish
git push origin main --tags
```

---

## Testing Before Publish

### Local Testing

```bash
# Link package locally
npm link

# Test in another project
cd /path/to/test-project
npm link @vibedevid/ai-memory
npx ai-memory init --yes

# Cleanup
npm unlink @vibedevid/ai-memory
```

### Test Installation

```bash
# After publishing
npx @vibedevid/ai-memory@latest init --yes
```

---

## Post-Publish Checklist

- [ ] Test: `npx @vibedevid/ai-memory init`
- [ ] Verify on npm: https://www.npmjs.com/package/@vibedevid/ai-memory
- [ ] Check GitHub release created
- [ ] Update README if needed
- [ ] Announce in community

---

## Distribution

### Share Command

```bash
# Simple one-liner for teams
npx @vibedevid/ai-memory init
```

### For Documentation

```markdown
## Setup AI Memory

\`\`\`bash
npx @vibedevid/ai-memory init
\`\`\`
```

---

**Ready to Publish!** 🚀
