# Use Personal Access Token

## After creating your token, run these commands:

```bash
# Remove existing remote
git remote remove origin

# Add remote with token (replace YOUR_TOKEN with the actual token)
git remote add origin https://YOUR_TOKEN@github.com/Pkishoreprakash2005/contract-lens-app.git

# Push to GitHub
git push -u origin main

# Deploy to GitHub Pages
npm run deploy
```

## Example:
If your token is `ghp_abc123xyz`, use:
```bash
git remote add origin https://ghp_abc123xyz@github.com/Pkishoreprakash2005/contract-lens-app.git
```

## After successful push:
1. Go to your repository on GitHub
2. Settings → Pages
3. Source: `gh-pages` branch
4. Save

Your app will be live at:
https://Pkishoreprakash2005.github.io/contract-lens-app/