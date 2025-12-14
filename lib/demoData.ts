import { FamilyMember } from '@/types/family';

// Color palette for generations - warm, traditional colors
const GENERATION_COLORS = {
  ancestor: '#1e3c30', // deep emerald
  elder: '#2d5a52', // forest green
  parent: '#4a8b7f', // sage green
  current: '#7fb3a0', // soft green
  younger: '#b8d9cc', // light green
};

export const demoFamilyTree: FamilyMember = {
  id: 'ahmad-1',
  name: {
    english: 'Ahmad ibn Muhammad',
    arabic: 'أحمد بن محمد',
  },
  color: GENERATION_COLORS.ancestor,
  metadata: {
    birthYear: '1935',
    deathYear: '2010',
    kunyah: 'Abu Malik',
    location: 'Damascus, Syria',
  },
  children: [
    {
      id: 'mohammad-1',
      name: {
        english: 'Muhammad ibn Ahmad',
        arabic: 'محمد بن أحمد',
      },
      color: GENERATION_COLORS.elder,
      metadata: {
        birthYear: '1960',
        kunyah: 'Abu Hasan',
        location: 'Damascus, Syria',
      },
      children: [
        {
          id: 'hasan-1',
          name: {
            english: 'Hasan ibn Muhammad',
            arabic: 'حسن بن محمد',
          },
          color: GENERATION_COLORS.current,
          metadata: {
            birthYear: '1985',
            location: 'Beirut, Lebanon',
            notes: 'Scholar of Islamic Studies',
          },
          children: [
            {
              id: 'ali-1',
              name: {
                english: 'Ali ibn Hasan',
                arabic: 'علي بن حسن',
              },
              color: GENERATION_COLORS.younger,
              metadata: {
                birthYear: '2010',
                location: 'Beirut, Lebanon',
              },
              children: [],
            },

          ],
        },

      ],
    },
    {
      id: 'omar-1',
      name: {
        english: 'abcdef ghijkl mnop q rstuv',
        arabic: 'عمر بن أحمد',
      },
      color: GENERATION_COLORS.elder,
      metadata: {
        birthYear: '1958',
        kunyah: 'Abu Ibrahim',
        location: 'Amman, Jordan',
      },
      children: [],
    },
    {
      id: 'ibrahim-1',
      name: {
        english: 'Ibrahim ibn Ahmad',
        arabic: 'إبراهيم بن أحمد',
      },
      color: GENERATION_COLORS.elder,
      metadata: {
        birthYear: '1963',
        kunyah: 'Abu Yousuf',
        location: 'Cairo, Egypt',
      },
      children: [],
    },
  ],
};

// Export all colors for use in components
export { GENERATION_COLORS };
