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
 * Get generation statistics
 */
export const getGenerationStats = (root: FamilyMember) => {
  const members = getAllMembers(root);
  const generations = new Map<number, number>();

  members.forEach((member) => {
    const gen = member.metadata?.generation || 0;
    generations.set(gen, (generations.get(gen) || 0) + 1);
  });

  return {
    totalMembers: members.length,
    generations: Object.fromEntries(generations),
    maxGeneration: Math.max(...Array.from(generations.keys())),
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
      member.name.arabic?.toLowerCase().includes(lowerQuery) ||
      member.title.toLowerCase().includes(lowerQuery)
  );
};
