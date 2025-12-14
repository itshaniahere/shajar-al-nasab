# Shajra - Islamic Family Tree Application

A modern, respectful Next.js application for visualizing and documenting Islamic family lineages (Shajra/Nasab). This application helps preserve family heritage and genealogy in an accessible, beautiful format.

## 🌳 Features

### Core Functionality
- **Family Tree Visualization**: Display hierarchical family lineage structure with SVG-based rendering
- **Interactive Nodes**: Click any family member to view detailed information
- **Pan & Zoom**: Drag to pan the canvas, scroll to zoom in/out
- **Reset View**: Restore default zoom and position with one click
- **Multiple Generations**: Support for unlimited family generations and branches

### Person/Node Information
- **Names**: Support for both English and Arabic names
- **Titles**: Role/relationship definitions (Father, Mother, Son, Daughter, etc.)
- **Metadata**: Birth/death dates, locations, kunyah (honorific titles), notes
- **Gender Differentiation**: Visual distinction between male and female members
- **Leaf Node Indicator**: Bold display for family members with no children recorded

### Theme System
- **Dark & Light Modes**: Toggle between elegant dark and clean light themes
- **Smooth Transitions**: Seamless theme switching with instant effect
- **System Preference**: Auto-detects system theme preference on first load

### Export & Preservation
- **JSON Export**: Backup family data for archival with timestamp
- **Local Storage**: All data remains in your browser (privacy-first approach)
- **Family Statistics**: View total members, generation count, and generation breakdown

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 💻 Usage

### Viewing the Family Tree
1. The application loads with a demo family tree showing 3 generations
2. Click on any family member node to view their details in the right panel
3. Use the controls at the top right to zoom in/out or reset the view

### Navigating the Tree
- **Pan**: Click and drag the background to move around the tree
- **Zoom In**: Click the "🔍+" button or scroll up with mouse wheel
- **Zoom Out**: Click the "🔍−" button or scroll down with mouse wheel
- **Reset**: Click the "⊙" button to return to default view

### Features
- **Family Statistics**: Click "Stats" button to see total members and generation breakdown
- **Export Data**: Click "Export" button to download family tree as JSON
- **Theme Toggle**: Click sun/moon icon to switch between light and dark themes

## 🎨 Design & Colors

### Generation Colors
- **Ancestor**: Deep Emerald (#1e3c30)
- **Elder**: Forest Green (#2d5a52)
- **Parent**: Sage Green (#4a8b7f)
- **Current**: Soft Green (#7fb3a0)
- **Younger**: Light Green (#b8d9cc)

### Gender Differentiation
- **Male**: Deep Blue-Gray (#4b5563)
- **Female**: Warm Terracotta (#9b6b5c)

## 🔒 Privacy & Security

**Important**: This application prioritizes your family's privacy:
- ✅ All data is stored locally in your browser
- ✅ No data is sent to any server
- ✅ No cloud storage
- ✅ No tracking or analytics
- ✅ Regular backups recommended (export as JSON)

## 📦 Demo Data

The application includes a demo family tree with 3 generations following Islamic naming conventions (ibn/bint format).

## 🛠️ Technical Stack

- **Framework**: Next.js 16.0.10 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React
- **Rendering**: SVG for scalable graphics
- **State Management**: React Hooks

## 📚 How to Add Your Family Data

Edit `lib/demoData.ts` to add your family members following the `FamilyMember` interface structure.

## 📖 Resources

- **Nasab (نسب)**: Islamic practice of documenting lineage
- **Kunyah (كنية)**: Honorific title (Abu/Umm + name)
- **Ibn/Bint**: "Son of" / "Daughter of" in Arabic naming

## 🙏 Acknowledgments

This application honors the Islamic tradition of preserving lineage (Nasab) and family heritage with utmost respect.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
