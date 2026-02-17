# Manual Upload - Detailed Steps

## Step 1: Prepare Files for Upload

### Files to Upload (Essential):
✅ `package.json`
✅ `index.html`
✅ `vite.config.ts`
✅ `tsconfig.json`
✅ `tailwind.config.js`
✅ `postcss.config.js`
✅ `README.md`
✅ `.env.example` (NOT .env)

### Folders to Upload:
✅ `src/` (entire folder with all contents)
✅ `public/` (if exists)

### Files to SKIP:
❌ `node_modules/` (too large)
❌ `dist/` (will be generated)
❌ `.env` (contains your API key)
❌ `.git/` (Git folder)

## Step 2: Upload Process

### Method A: Individual File Upload
1. Go to: https://github.com/Pkishoreprakash2005/contract-lens-app
2. Click "Add file" → "Upload files"
3. Drag and drop files or click "choose your files"
4. Upload files one by one
5. Add commit message: "Initial upload: Contract Lens app files"
6. Click "Commit changes"

### Method B: Create Files Directly
1. Click "Add file" → "Create new file"
2. Type filename (e.g., `package.json`)
3. Copy and paste content from your local file
4. Click "Commit new file"
5. Repeat for each file

## Step 3: Upload src/ Folder Contents

### For each file in src/:
1. Click "Add file" → "Create new file"
2. Type: `src/filename.tsx` (include the folder path)
3. Copy content from your local file
4. Commit

### Example:
- `src/App.tsx`
- `src/types.ts`
- `src/index.css`
- `src/components/ApiTest.tsx`
- `src/components/ContractResult.tsx`
- `src/services/geminiService.ts`
- etc.

## Step 4: After All Files Are Uploaded

1. Your repository should show all your files
2. GitHub will automatically detect it's a Node.js project
3. You can see your files in the repository

## Step 5: Enable GitHub Actions (for automatic deployment)

1. Go to your repository
2. Click "Actions" tab
3. Search for "Node.js" workflow
4. Set up the workflow for automatic building

## Step 6: Manual GitHub Pages Setup

Since we can't use `npm run deploy` without terminal access:

1. Go to repository "Settings"
2. Scroll to "Pages" section
3. Source: "GitHub Actions" (recommended)
4. Or Source: "Deploy from a branch" → select "main" branch → "/ (root)"
5. Click "Save"

## Step 7: Your Live URL

After setup, your app will be available at:
https://Pkishoreprakash2005.github.io/contract-lens-app/

Note: It may take 5-10 minutes for the first deployment.