# Exact Commands to Run

## After creating your GitHub repository, run these commands:

```bash
# Remove any existing remote (if needed)
git remote remove origin

# Add the correct remote (replace YOUR_EXACT_USERNAME)
git remote add origin https://github.com/YOUR_EXACT_USERNAME/contract-lens-app.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main

# Deploy to GitHub Pages
npm run deploy
```

## Replace YOUR_EXACT_USERNAME with your actual GitHub username!

## Example:
If your username is `kishoreprakash`, use:
```bash
git remote add origin https://github.com/kishoreprakash/contract-lens-app.git
```

## After Successful Push:
1. Go to your repository on GitHub
2. Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: `gh-pages`
5. Save

Your app will be live at:
`https://YOUR_EXACT_USERNAME.github.io/contract-lens-app/`