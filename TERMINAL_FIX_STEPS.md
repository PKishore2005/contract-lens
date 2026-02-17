# Fix Terminal Issues - Step by Step

## The Problem:
Your terminal shows npm errors and Git authentication issues.

## Solution Steps:

### Step 1: Clear Terminal Issues
```bash
# Clear the terminal
clear

# Make sure you're in the right directory
cd "/Users/kishoreprakash/Contract lens"
```

### Step 2: Fix Git Authentication
You have two options:

#### Option A: Use Personal Access Token (Recommended)
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with "repo" permissions
3. Copy the token
4. Use this command:
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/Pkishoreprakash2005/contract-lens-app.git
```

#### Option B: Use GitHub CLI
```bash
# Install GitHub CLI (if not installed)
brew install gh

# Login to GitHub
gh auth login

# Push your code
git push -u origin main
```

### Step 3: Alternative - Create Repository via CLI
```bash
# Create repository directly from terminal
gh repo create contract-lens-app --public --source=. --remote=origin --push
```

### Step 4: Deploy to GitHub Pages
```bash
npm run deploy
```

## If You Get npm Errors:
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try deploy again
npm run deploy
```

## Final Step: Enable GitHub Pages
1. Go to your repository: https://github.com/Pkishoreprakash2005/contract-lens-app
2. Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: `gh-pages`
5. Save

## Your Public URL Will Be:
https://Pkishoreprakash2005.github.io/contract-lens-app/