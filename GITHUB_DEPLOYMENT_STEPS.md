# 🚀 Deploy YOUR Contract Lens App to GitHub Pages

## Step-by-Step Instructions for Public Access

### Step 1: Create GitHub Repository

1. **Go to [GitHub.com](https://github.com) and sign in**
2. **Click "New repository" (green button)**
3. **Repository settings**:
   - Repository name: `contract-lens-app`
   - Description: `AI-powered contract analysis and scam detection tool`
   - **Make it PUBLIC** (required for free GitHub Pages)
   - **Don't check** "Add a README file" (we already have one)
   - **Don't check** "Add .gitignore" (we already have one)
   - **Don't check** "Choose a license"
4. **Click "Create repository"**

### Step 2: Connect Your Local Code to GitHub

Copy these commands and run them in your terminal **one by one**:

```bash
# Connect to your GitHub repository (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/contract-lens-app.git

# Rename branch to main
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Important**: Replace `YOUR_USERNAME` with your actual GitHub username!

### Step 3: Deploy to GitHub Pages

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

This command will:
- Build your app for production
- Create a `gh-pages` branch
- Upload your built app to GitHub Pages

### Step 4: Enable GitHub Pages

1. **Go to your repository on GitHub**
2. **Click "Settings" tab** (at the top of your repository)
3. **Scroll down to "Pages" section** (in the left sidebar)
4. **Under "Source"**:
   - Select "Deploy from a branch"
   - Branch: Select `gh-pages`
   - Folder: Select `/ (root)`
5. **Click "Save"**

### Step 5: Get Your Public URL

After 5-10 minutes, your app will be live at:
```
https://YOUR_USERNAME.github.io/contract-lens-app/
```

**This URL will be accessible to EVERYONE in the world - no GitHub account needed!**

### Step 6: Test Your Deployment

1. **Wait 5-10 minutes** for GitHub to process the deployment
2. **Visit your URL**: `https://YOUR_USERNAME.github.io/contract-lens-app/`
3. **You should see YOUR Contract Lens app** with:
   - Guardian AI branding
   - Contract Lens and Scam Shield options
   - File upload functionality
   - Real AI analysis

### Troubleshooting

**If you see a 404 error:**
1. Wait 10 more minutes (GitHub Pages can be slow)
2. Check that the `gh-pages` branch exists in your repository
3. Verify GitHub Pages is enabled in Settings → Pages

**If you see the wrong app:**
1. Make sure you're using the correct repository name
2. Check that you pushed the right code to GitHub
3. Verify the `gh-pages` branch has your built files

**If the app doesn't work:**
1. Check browser console for errors
2. Verify the API key is working (check the API test component)
3. Make sure all files were properly committed and pushed

### Updating Your Live App

Whenever you make changes to your app:

```bash
# Commit your changes
git add .
git commit -m "Update: describe your changes"
git push origin main

# Deploy the updates
npm run deploy
```

Your live app will update in 2-3 minutes.

---

## 🎉 Final Result

Your Contract Lens app will be live at:
**`https://YOUR_USERNAME.github.io/contract-lens-app/`**

**Anyone in the world can:**
- ✅ Visit this URL without any account
- ✅ Upload contracts for AI analysis
- ✅ Use scam detection features
- ✅ Access from any device (phone, tablet, computer)
- ✅ Use in any browser

**This is YOUR app that we built together - not someone else's!**