#!/bin/bash

# ==============================================
# SHAJRA - Islamic Family Tree Application
# Development & Deployment Guide
# ==============================================

# START DEVELOPMENT SERVER
npm run dev
# Opens at http://localhost:3000

# BUILD FOR PRODUCTION
npm run build
npm start

# LINT CODE
npm run lint

# ==============================================
# PROJECT STRUCTURE
# ==============================================

# Entry Point: app/page.tsx
# Main component tree:
#   - Page.tsx
#     ├── Header (theme toggle, export, stats)
#     ├── Stats Panel (optional)
#     ├── Main Container
#     │   ├── FamilyTree.tsx (left, 75%)
#     │   └── DetailPanel.tsx (right, 25%)
#     └── Footer (privacy notice)

# ==============================================
# KEY FILES
# ==============================================

# Data Structure:
#   types/family.ts          → FamilyMember interface

# Demo Data:
#   lib/demoData.ts          → Sample family tree

# Utilities:
#   lib/utils.ts             → Export, search, statistics

# Components:
#   components/FamilyTree.tsx    → Canvas visualization
#   components/DetailPanel.tsx   → Information sidebar

# Main Page:
#   app/page.tsx             → Application entry point
#   app/layout.tsx           → Metadata & layout
#   app/globals.css          → Global styles

# Documentation:
#   README.md                → Main documentation
#   CUSTOMIZATION.md         → How to customize
#   QUICK_REFERENCE.md       → Developer reference

# ==============================================
# CUSTOMIZATION STEPS
# ==============================================

# 1. ADD YOUR FAMILY DATA
#    Edit: lib/demoData.ts
#    Modify: demoFamilyTree object
#    Follow: FamilyMember interface pattern

# 2. ADJUST VISUAL LAYOUT
#    Edit: components/FamilyTree.tsx
#    Modify: NODE_RADIUS, GENERATION_HEIGHT, SIBLING_SPACING

# 3. CHANGE COLORS
#    Edit: lib/demoData.ts
#    Modify: GENERATION_COLORS, GENDER_COLORS objects

# 4. ADD METADATA FIELDS
#    Edit: types/family.ts
#    Modify: metadata interface
#    Display: components/DetailPanel.tsx

# 5. EXTEND FEATURES
#    Add new components in: components/
#    Add utilities in: lib/utils.ts
#    Update types in: types/family.ts
#    Integrate in: app/page.tsx

# ==============================================
# FEATURES AVAILABLE
# ==============================================

# ✓ Interactive family tree visualization
# ✓ Click nodes to view detailed information
# ✓ Pan by dragging, zoom with scroll wheel
# ✓ Dark/light theme toggle
# ✓ Export family tree as JSON
# ✓ View family statistics
# ✓ Responsive design
# ✓ Privacy-first (local storage only)
# ✓ Support for Arabic names
# ✓ Gender differentiation
# ✓ Generation-based color coding

# ==============================================
# TECHNICAL STACK
# ==============================================

# Frontend Framework:  Next.js 16.0.10
# React Version:       19.2.1
# TypeScript:          5.x
# Styling:             Tailwind CSS 4.0
# Icons:               Lucide React
# Rendering:           SVG (scalable)
# State Management:    React Hooks

# ==============================================
# DEPLOYMENT OPTIONS
# ==============================================

# VERCEL (Recommended):
#   vercel

# NETLIFY:
#   npm run build
#   Deploy /out directory

# GITHUB PAGES:
#   npm run build
#   Push dist/ to gh-pages branch

# DOCKER:
#   docker build .
#   docker run -p 3000:3000 shajra

# ==============================================
# ENVIRONMENT SETUP
# ==============================================

# Required:
#   - Node.js 18+
#   - npm or yarn

# Install dependencies:
#   npm install

# No additional environment variables needed!
# (Application is fully client-side)

# ==============================================
# TROUBLESHOOTING
# ==============================================

# Issue: Dev server won't start
# Solution: rm -rf .next node_modules && npm install

# Issue: Components not rendering
# Solution: Check import paths, ensure @ alias works

# Issue: TypeScript errors
# Solution: npm run typecheck (or check terminal output)

# Issue: Zoom/pan not working
# Solution: Check event listeners in FamilyTree.tsx

# Issue: Export not downloading
# Solution: Check browser console for errors, check permissions

# ==============================================
# DEVELOPMENT WORKFLOW
# ==============================================

# 1. Start dev server: npm run dev
# 2. Open http://localhost:3000
# 3. Edit files and see changes instantly
# 4. Check terminal for TypeScript errors
# 5. Test all features
# 6. Build for production: npm run build
# 7. Test production build: npm start
# 8. Deploy!

# ==============================================
# USEFUL COMMANDS
# ==============================================

# Format code (requires prettier):
# npm run format

# Run linter:
# npm run lint

# Type check:
# npx tsc --noEmit

# Check dependencies:
# npm outdated

# Update dependencies:
# npm update

# Clean build:
# rm -rf .next node_modules package-lock.json && npm install

# ==============================================
# SECURITY NOTES
# ==============================================

# ✓ All data stays in browser (no server)
# ✓ No data transmission
# ✓ No analytics or tracking
# ✓ No external API calls
# ✓ No database required
# ✓ No authentication needed
# ✓ Export data regularly for backup

# ==============================================
# PERFORMANCE TIPS
# ==============================================

# For large family trees:
# - Optimize NODE_RADIUS (might impact rendering)
# - Consider virtual scrolling for many siblings
# - Use React.memo() on expensive components
# - Profile with React DevTools

# ==============================================
# FUTURE ENHANCEMENTS
# ==============================================

# Priority 1:
# - Add/Edit family members UI
# - Search functionality
# - Import JSON files

# Priority 2:
# - Photo integration
# - PDF export
# - Print layout

# Priority 3:
# - Full Arabic interface (RTL)
# - Collaborative editing
# - Timeline view
# - Advanced statistics

# ==============================================
# CULTURAL CONSIDERATIONS
# ==============================================

# This application honors the Islamic tradition
# of preserving Nasab (genealogy) with:
#
# ✓ Respectful, dignified presentation
# ✓ Privacy protection
# ✓ Support for Islamic naming conventions
# ✓ Beautiful, purposeful design
# ✓ Accessibility for all users
#
# May this serve families for generations.

# ==============================================
# RESOURCES
# ==============================================

# Documentation:
#   - Next.js: https://nextjs.org/docs
#   - React: https://react.dev
#   - TypeScript: https://www.typescriptlang.org/docs
#   - Tailwind: https://tailwindcss.com/docs
#   - Lucide Icons: https://lucide.dev

# Islamic Resources:
#   - Nasab (نسب): Family genealogy practice
#   - Kunyah (كنية): Honorific titles
#   - Ibn/Bint: "Son of" / "Daughter of"

# ==============================================
# SUPPORT
# ==============================================

# For help:
# 1. Check README.md
# 2. Read CUSTOMIZATION.md
# 3. Review QUICK_REFERENCE.md
# 4. Check code comments
# 5. Test in browser console

# ==============================================
