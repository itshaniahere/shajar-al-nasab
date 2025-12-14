# Deploy to GitHub Pages

## Setup Instructions

1. **Create a GitHub Repository**
   - Go to https://github.com/new
   - Create a new repo named `shajar-al-nasab` (or your preferred name)
   - Copy the repo URL

2. **Initialize Git & Push**
   ```bash
   cd /Users/mjamil/Jamilsworkspace/shajar-al-nasab
   git init
   git add .
   git commit -m "Initial commit: Shajra family tree application"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/shajar-al-nasab.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /(root) - the workflow will handle this
   - Click Save

4. **Enable Actions**
   - Go to Actions tab in your repo
   - Click "I understand my workflows, go ahead and enable them"

5. **Wait for Deployment**
   - Go to Actions tab
   - Watch the "Deploy to GitHub Pages" workflow run
   - Once complete, your site is live at: `https://YOUR_USERNAME.github.io/shajar-al-nasab/`

## Local Testing

Test the static build locally:
```bash
GITHUB_PAGES=true npm run build
npx serve out
```

Then visit `http://localhost:3000`

## Updates

Every time you push to main branch:
```bash
git add .
git commit -m "Your commit message"
git push
```

The GitHub Actions workflow will automatically rebuild and redeploy your site!

## Troubleshooting

- **Workflow fails**: Check Actions tab for error logs
- **Site shows 404**: Make sure basePath is configured correctly
- **Styles missing**: Clear browser cache or do a hard refresh (Cmd+Shift+R on Mac)
