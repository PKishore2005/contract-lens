# Manual Repository Creation Steps

## Step 1: Create Repository on GitHub Website

1. **Go to GitHub.com** (new tab)
2. **Click the "+" icon** (top right) → "New repository"
3. **Repository name**: `contract-lens-app`
4. **Description**: `AI-powered contract analysis and scam detection tool`
5. **Make it PUBLIC** ✅
6. **Don't initialize with README** (we have files already)
7. **Click "Create repository"**

## Step 2: After Creating Repository

GitHub will show you commands like:
```
git remote add origin https://github.com/Pkishoreprakash2005/contract-lens-app.git
git branch -M main
git push -u origin main
```

## Step 3: Run These Commands in Terminal

```bash
# Remove existing remote (if any)
git remote remove origin

# Add the new remote
git remote add origin https://github.com/Pkishoreprakash2005/contract-lens-app.git

# Push your code
git branch -M main
git push -u origin main
```

## Step 4: Deploy to GitHub Pages

```bash
npm run deploy
```

## Step 5: Enable GitHub Pages

1. Go to your repository: https://github.com/Pkishoreprakash2005/contract-lens-app
2. Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: `gh-pages`
5. Save

## Your Public URL Will Be:
https://Pkishoreprakash2005.github.io/contract-lens-app/