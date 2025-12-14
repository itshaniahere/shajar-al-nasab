// Family member data structure
export interface FamilyMember {
  id: string;
  name: {
    english: string;
    arabic?: string;
  };
  color?: string;
  children?: FamilyMember[];
  metadata?: {
    birthYear?: string;
    deathYear?: string;
    location?: string;
    notes?: string;
    kunyah?: string; // كنية (honorific title)
  };
}

// Canvas transformation state
export interface CanvasTransform {
  x: number;
  y: number;
  scale: number;
}

// Selected member for detail panel
export interface SelectedMember {
  member: FamilyMember;
  generation: number;
  childrenCount: number;
}
