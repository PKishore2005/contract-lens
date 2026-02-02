# 🚀 Contract Lens - Deployment Guide

## Deploy to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click "New repository" (green button)
3. Repository name: `contract-lens`
4. Description: `AI-powered contract analysis and scam detection app`
5. Make it **Public** (required for free GitHub Pages)
6. **Don't** initialize with README (we already have files)
7. Click "Create repository"

### Step 2: Connect Local Repository to GitHub

Copy and run these commands in your terminal:

```bash
# Add GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/contract-lens.git

# Push code to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### Step 3: Deploy to GitHub Pages

```bash
# Build and deploy the app
npm run deploy
```

This will:
- Build the production version
- Create a `gh-pages` branch
- Deploy to GitHub Pages automatically

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select branch: `gh-pages`
6. Select folder: `/ (root)`
7. Click "Save"

### Step 5: Access Your Live App

Your app will be available at:
```
https://YOUR_USERNAME.github.io/contract-lens/
```

**Note**: It may take 5-10 minutes for the first deployment to be live.

## Environment Variables for Production

⚠️ **Important**: The API key is currently hardcoded in the app for testing. For production:

1. **Option A**: Keep the current setup (API key in code)
   - Simple but less secure
   - Works immediately

2. **Option B**: Use GitHub Secrets (more secure)
   - Go to repository Settings → Secrets and variables → Actions
   - Add secret: `VITE_API_KEY` with your API key value
   - Update the code to use environment variables only

## Updating Your Deployed App

Whenever you make changes:

```bash
# Commit your changes
git add .
git commit -m "Update: describe your changes"
git push origin main

# Deploy updated version
npm run deploy
```

## Alternative Deployment Options

### Vercel (Recommended for production)
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Add environment variable: `VITE_API_KEY`
5. Deploy automatically

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. New site from Git → Choose your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variable: `VITE_API_KEY`

## Troubleshooting

### Common Issues:

1. **404 Error**: Check that GitHub Pages is enabled and using `gh-pages` branch
2. **Blank Page**: Check browser console for errors, might be base URL issue
3. **API Not Working**: Verify API key is properly configured
4. **Build Fails**: Run `npm run build` locally to check for errors

### Support:
- Check the browser console for error messages
- Verify all files are committed and pushed to GitHub
- Ensure the repository is public for free GitHub Pages

---

🎉 **Your Contract Lens app will be live and accessible to everyone worldwide!**