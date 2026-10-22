# Cinematic Space-Travel Landing Page

A cinematic space-travel landing page featuring a dual full-height layout, custom JavaScript requestAnimationFrame video crossfades, a liquid-glass design system, and Framer Motion animations.

## 🚀 Features

- **Liquid-Glass Design System**: Multi-layer glassmorphic containers with luminosity blending, backdrop blurs, and dynamic gradient borders (`.liquid-glass` & `.liquid-glass-strong`).
- **Seamless JS Video Crossfading**: Pure requestAnimationFrame-driven loop transitions with zero CSS flicker.
- **BlurText Word-by-Word Reveal**: IntersectionObserver-triggered staggered entrance typography.
- **Responsive Layout**: Fluid navigation, mobile drawer menu, and interactive modals for mission reservations, liftoff feeds, and trajectory planning.
- **Custom Typography**: Instrument Serif & Barlow font hierarchy.

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 How to Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `space-travel-landing`).
2. Run the following commands in your project terminal:

```bash
git init
git add .
git commit -m "feat: initial commit for cinematic space-travel landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

3. To enable free hosting on **GitHub Pages**:
   - Go to your repository settings on GitHub: **Settings** -> **Pages**.
   - Under **Build and deployment** -> **Source**, select **GitHub Actions**.
   - The pre-configured `.github/workflows/deploy.yml` workflow will automatically build and publish your site!
