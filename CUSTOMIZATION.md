// CUSTOMIZATION GUIDE for Shajra Application
// This file helps you understand how to customize the application for your family

// ============================================
// 1. ADDING YOUR OWN FAMILY DATA
// ============================================

// File: lib/demoData.ts
// The demoFamilyTree object defines the root of your family tree.
// You can either:
// A) Modify the existing demoFamilyTree directly
// B) Create a new function that builds your tree

// Example: Basic structure
/*
const myFamilyTree: FamilyMember = {
  id: 'grandfather-id',
  name: {
    english: 'Abdullah ibn Muhammad',
    arabic: 'عبدالله بن محمد'
  },
  title: 'Grandfather',
  gender: 'male',
  color: GENERATION_COLORS.ancestor,
  metadata: {
    birthYear: '1940',
    location: 'Cairo, Egypt',
    relationship: 'ancestor',
    generation: 0,
    kunyah: 'Abu Kareem'
  },
  children: [
    {
      id: 'son-id',
      name: {
        english: 'Ahmed ibn Abdullah',
        arabic: 'أحمد بن عبدالله'
      },
      title: 'Father',
      gender: 'male',
      color: GENERATION_COLORS.parent,
      metadata: {
        birthYear: '1965',
        location: 'Cairo, Egypt',
        relationship: 'parent',
        generation: 1,
        kunyah: 'Abu Omar'
      },
      children: [
        // Add your siblings/cousins here
      ]
    }
  ]
};
*/

// ============================================
// 2. GENERATION COLORS
// ============================================

// File: lib/demoData.ts
// Customize colors for different generations

// Current colors:
/*
const GENERATION_COLORS = {
  ancestor: '#1e3c30',  // Deep emerald
  elder: '#2d5a52',     // Forest green
  parent: '#4a8b7f',    // Sage green
  current: '#7fb3a0',   // Soft green
  younger: '#b8d9cc',   // Light green
};
*/

// To change: Replace hex codes with your preferred colors
// Tip: Use warm colors (emerald, gold, deep blue, burgundy) for respectful look

// ============================================
// 3. NODE STYLING
// ============================================

// File: components/FamilyTree.tsx
// Line ~30-35: Adjust node size
const NODE_RADIUS = 30;           // 60px diameter node (30 * 2)
const GENERATION_HEIGHT = 180;    // Vertical spacing between generations
const SIBLING_SPACING = 120;      // Horizontal spacing between siblings

// To adjust tree layout:
// - Increase NODE_RADIUS for bigger nodes
// - Increase GENERATION_HEIGHT for more vertical space
// - Increase SIBLING_SPACING for more horizontal space

// ============================================
// 4. THEME COLORS
// ============================================

// File: app/page.tsx
// The theme system automatically switches between light and dark

// Light theme: Uses white backgrounds and dark text
// Dark theme: Uses gray backgrounds and light text

// To customize further:
// - Edit Tailwind classes in JSX (bg-gray-50, dark:bg-gray-900, etc.)
// - Modify app/globals.css for root theme colors

// ============================================
// 5. METADATA FIELDS
// ============================================

// File: types/family.ts
// Add custom metadata fields as needed:

/*
metadata?: {
  birthYear?: string;
  deathYear?: string;
  location?: string;
  relationship: string;
  generation: number;
  notes?: string;
  kunyah?: string;
  // Add more fields below:
  // birthPlace?: string;
  // occupation?: string;
  // achievements?: string[];
  // photoUrl?: string;
}
*/

// Then display these in components/DetailPanel.tsx

// ============================================
// 6. EXPORTING AND IMPORTING
// ============================================

// File: lib/utils.ts
// Current features:
// - exportAsJSON(): Downloads your tree as JSON file
// - importFromJSON(): Reads JSON file (function exists, not UI yet)
// - getAllMembers(): Gets flat list of all family members
// - getGenerationStats(): Gets statistics
// - searchMembers(): Searches for family members

// To implement import UI:
// 1. Add file input in page.tsx
// 2. Call importFromJSON() with selected file
// 3. Update demoFamilyTree state with imported data

// ============================================
// 7. RESPONSIVE DESIGN
// ============================================

// The app uses Tailwind CSS for responsive design
// Key breakpoints:
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px

// Modify layout in:
// - app/page.tsx (header layout)
// - components/DetailPanel.tsx (panel width: w-80)
// - components/FamilyTree.tsx (canvas controls)

// ============================================
// 8. INTERNATIONALISATION (Arabic Support)
// ============================================

// Current: Both English and Arabic names supported
// Name structure:
/*
name: {
  english: 'Ahmad ibn Abdullah',    // Always required
  arabic: 'أحمد بن عبدالله'         // Optional
}
*/

// To add full Arabic UI:
// 1. Create translations for headers, buttons
// 2. Add RTL mode to document.html
// 3. Use Arabic font (e.g., Cairo, Rakkas from Google Fonts)
// 4. Update Tailwind config for RTL

// ============================================
// 9. ADDING NEW FEATURES
// ============================================

// File locations for new features:

// New utility functions:
//   → lib/utils.ts

// New UI components:
//   → components/[ComponentName].tsx

// Type definitions:
//   → types/family.ts

// Styling:
//   → app/globals.css or inline Tailwind classes

// ============================================
// 10. COMMON CUSTOMIZATIONS
// ============================================

// A) Add birth/death location on nodes:
//    - Modify components/FamilyTree.tsx around line ~200
//    - Add another <text> element for location

// B) Add photo/avatar to nodes:
//    - Add photoUrl to metadata
//    - Use SVG <image> element in FamilyTree component
//    - Add image upload UI to Detail Panel

// C) Change node shapes from circles:
//    - Replace <circle> with <rect> or <polygon> in FamilyTree.tsx
//    - Adjust positioning and sizes accordingly

// D) Add connection lines for married couples:
//    - Add spouse field to FamilyMember interface
//    - Draw connecting line between spouses in FamilyTree.tsx

// E) Highlight multiple selected members:
//    - Change selectedMember from single to array
//    - Update click handlers and panel to show multiple

// ============================================
// 11. PERFORMANCE OPTIMIZATION
// ============================================

// For large family trees (100+ members):

// 1. Virtualization: Only render visible nodes
//    - Consider react-virtual or similar library

// 2. Memoization: Prevent unnecessary re-renders
//    - Wrap components with React.memo()
//    - Use useMemo() for expensive calculations

// 3. Canvas rendering: Use Canvas API instead of SVG for huge trees
//    - Create separate CanvasBasedFamilyTree component

// 4. Data structure: Optimize for large trees
//    - Consider D3.js for advanced tree layout

// ============================================
// 12. PRIVACY CONSIDERATIONS
// ============================================

// Current: All data stays in browser

// To enhance privacy further:
// 1. Add password protection for exported files
// 2. Implement data encryption
// 3. Add "clear all data" button
// 4. Implement auto-expiry for session data

// ============================================
// HELPFUL RESOURCES
// ============================================

// Next.js: https://nextjs.org/docs
// TypeScript: https://www.typescriptlang.org/docs
// Tailwind CSS: https://tailwindcss.com/docs
// React: https://react.dev
// Lucide Icons: https://lucide.dev

// Islamic Genealogy:
// - Nasab (نسب): https://en.wikipedia.org/wiki/Nasab
// - Kunyah (كنية): https://en.wikipedia.org/wiki/Kunyah
