import { FamilyMember } from '@/types/family';

/**
 * Export family tree data as JSON for backup and archival
 */
export const exportAsJSON = (familyTree: FamilyMember, fileName: string = 'shajra-family-tree.json'): void => {
  const dataStr = JSON.stringify(familyTree, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export SVG canvas as PNG image
 */
export const exportAsPNG = async (svgElement: SVGSVGElement, fileName: string = 'shajra-family-tree.png'): Promise<void> => {
  try {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');

    const img = new Image();
    const svg = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svg);

    img.onload = () => {
      // Set canvas size with padding
      const padding = 40;
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + padding * 2;

      // Fill background with white
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the image
      ctx.drawImage(img, padding, padding);

      // Convert to PNG and download
      canvas.toBlob((blob) => {
        if (!blob) throw new Error('Could not create blob');
        
        const pngUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pngUrl);
        URL.revokeObjectURL(url);
      }, 'image/png');
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      throw new Error('Failed to load SVG image');
    };

    img.src = url;
  } catch (error) {
    console.error('Error exporting PNG:', error);
    alert('Failed to export as PNG. Please try again.');
  }
};

/**
 * Import family tree data from JSON file
 */
export const importFromJSON = (file: File): Promise<FamilyMember> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as FamilyMember;
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsText(file);
  });
};

/**
 * Get all family members in a flat list (useful for search/statistics)
 */
export const getAllMembers = (root: FamilyMember): FamilyMember[] => {
  const members: FamilyMember[] = [root];

  const traverse = (member: FamilyMember) => {
    if (member.children) {
      member.children.forEach((child) => {
        members.push(child);
        traverse(child);
      });
    }
  };

  traverse(root);
  return members;
};

/**
 * Get family statistics
 */
export const getGenerationStats = (root: FamilyMember) => {
  const members = getAllMembers(root);

  return {
    totalMembers: members.length,
  };
};

/**
 * Search for family members by name
 */
export const searchMembers = (root: FamilyMember, query: string): FamilyMember[] => {
  const members = getAllMembers(root);
  const lowerQuery = query.toLowerCase();

  return members.filter(
    (member) =>
      member.name.english.toLowerCase().includes(lowerQuery) ||
      member.name.arabic?.toLowerCase().includes(lowerQuery)
  );
};
