// QUICK REFERENCE for Shajra Development

// ============================================
// FILE LOCATIONS & PURPOSES
// ============================================

// 📁 /app
//   layout.tsx          - Root layout wrapper
//   page.tsx            - Main page with header, controls, layout
//   globals.css         - Global Tailwind styles

// 📁 /components
//   FamilyTree.tsx      - SVG canvas with pan/zoom
//   DetailPanel.tsx     - Right sidebar with member details

// 📁 /lib
//   demoData.ts         - Demo family tree data
//   utils.ts            - Export, import, search utilities

// 📁 /types
//   family.ts           - TypeScript interfaces

// ============================================
// KEY INTERFACES
// ============================================

interface FamilyMember {
  id: string;
  name: { english: string; arabic?: string }
  title: string;
  gender: 'male' | 'female';
  color?: string;
  children?: FamilyMember[];
  metadata?: {
    birthYear?: string;
    deathYear?: string;
    location?: string;
    relationship: string;
    generation: number;
    notes?: string;
    kunyah?: string;
  }
}

interface SelectedMember {
  member: FamilyMember;
  generation: number;
  childrenCount: number;
}

interface CanvasTransform {
  x: number;      // Pan X position
  y: number;      // Pan Y position
  scale: number;  // Zoom level
}

// ============================================
// COMPONENT PROPS
// ============================================

// FamilyTree Component
interface FamilyTreeProps {
  rootMember: FamilyMember;
  selectedMember: SelectedMember | null;
  onSelectMember: (member: SelectedMember) => void;
  isDarkMode: boolean;
}

// DetailPanel Component
interface DetailPanelProps {
  selectedMember: SelectedMember | null;
  onClose: () => void;
  isDarkMode: boolean;
}

// ============================================
// KEY FUNCTIONS
// ============================================

// Export family tree as JSON
exportAsJSON(familyTree: FamilyMember, fileName?: string): void

// Get all members in flat list
getAllMembers(root: FamilyMember): FamilyMember[]

// Get generation statistics
getGenerationStats(root: FamilyMember): {
  totalMembers: number;
  generations: Record<number, number>;
  maxGeneration: number;
}

// Search for members
searchMembers(root: FamilyMember, query: string): FamilyMember[]

// Import from JSON
importFromJSON(file: File): Promise<FamilyMember>

// ============================================
// STATE VARIABLES (page.tsx)
// ============================================

isDarkMode: boolean              // Theme toggle
selectedMember: SelectedMember   // Selected family member
showStats: boolean               // Show/hide stats panel

// ============================================
// CONSTANTS
// ============================================

NODE_RADIUS = 30                 // 60px diameter
GENERATION_HEIGHT = 180          // Vertical spacing
SIBLING_SPACING = 120            // Horizontal spacing

GENERATION_COLORS = {
  ancestor: '#1e3c30',
  elder: '#2d5a52',
  parent: '#4a8b7f',
  current: '#7fb3a0',
  younger: '#b8d9cc',
}

// ============================================
// COMMON TASKS
// ============================================

// Add a new family member:
// 1. Edit lib/demoData.ts
// 2. Add to children array of parent
// 3. Fill in all required fields (id, name, title, gender, generation)

// Add custom metadata:
// 1. Update interface in types/family.ts
// 2. Add field to member objects in demoData.ts
// 3. Display in components/DetailPanel.tsx

// Change colors:
// 1. Edit GENERATION_COLORS in lib/demoData.ts
// 2. Or set color property on individual members

// Adjust tree layout:
// 1. Modify NODE_RADIUS, GENERATION_HEIGHT, SIBLING_SPACING
// 2. In components/FamilyTree.tsx near top of file

// Add new feature:
// 1. Add types in types/family.ts if needed
// 2. Add utility functions in lib/utils.ts
// 3. Create/modify component in components/
// 4. Integrate in app/page.tsx

// ============================================
// DEBUGGING TIPS
// ============================================

// Browser console debugging:
console.log('selectedMember:', selectedMember)
console.log('tree structure:', demoFamilyTree)

// Check TypeScript errors:
npm run dev  // Will show errors in terminal

// Test export functionality:
// 1. Click Export button
// 2. Check Downloads folder
// 3. Open JSON file to verify structure

// Test zoom/pan:
// 1. Scroll wheel to zoom
// 2. Click+drag to pan
// 3. Click reset button

// Test theme toggle:
// 1. Click sun/moon icon
// 2. Check localStorage (not implemented yet)

// ============================================
// USEFUL TAILWIND CLASSES
// ============================================

// Layout
flex justify-between items-center
grid grid-cols-3 gap-4
w-full h-screen

// Colors
bg-white dark:bg-gray-900
text-gray-900 dark:text-white
border-gray-200 dark:border-gray-700

// Spacing
px-4 py-3      // Padding
mx-2 my-1      // Margin
gap-3          // Grid/flex gap

// States
hover:bg-gray-100
active:cursor-grabbing
disabled:opacity-50

// Responsive
sm: md: lg: xl:
hidden sm:flex

// ============================================
// DEPLOYMENT
// ============================================

// Build for production:
npm run build
npm start

// Deploy to Vercel (recommended):
vercel

// Or push to GitHub and enable Vercel CI/CD

// Note: Application is static (no server-side logic)
//       So it works with any static host (Vercel, Netlify, etc.)

// ============================================
// USEFUL SHORTCUTS
// ============================================

// Format code:
// (Configure in .prettierrc if needed)

// Type check:
npm run typecheck  // if script exists

// Lint:
npm run lint

// Start dev server:
npm run dev

// ============================================
// NAMING CONVENTIONS
// ============================================

// Component files: PascalCase (FamilyTree.tsx)
// Type files: kebab-case (family.ts)
// Utility files: kebab-case (demo-data.ts)
// Variables: camelCase (selectedMember)
// Constants: UPPER_CASE (NODE_RADIUS)
// CSS classes: kebab-case (generated by Tailwind)

// ============================================
// COMMON ERRORS & SOLUTIONS
// ============================================

// Error: "Cannot find module '@/...'
// Solution: Check import paths, ensure @ alias configured in tsconfig

// Error: "Member is not defined"
// Solution: Check member object has all required fields

// Nodes not rendering:
// Solution: Check children array is properly populated

// Zoom/pan not working:
// Solution: Check event handlers in FamilyTree component

// Export not working:
// Solution: Check file permissions, ensure blob creation works

// ============================================
// LEARNING RESOURCES
// ============================================

// SVG for family trees: https://developer.mozilla.org/en-US/docs/Web/SVG
// React Hooks: https://react.dev/reference/react
// TypeScript: https://www.typescriptlang.org/docs/handbook/
// Tailwind: https://tailwindcss.com/docs/installation
// Next.js: https://nextjs.org/docs/getting-started

// For tree visualization:
// - D3.js: Advanced data visualization
// - Cytoscape.js: Graph visualization
// - GoJS: Commercial library for diagrams
