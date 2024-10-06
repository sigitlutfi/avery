// src/constants/colors.js
// Import the adjustColor helper

export const colors = {
  primary: '#1585d4', // Deep blue
  secondary: '#64B5F6',
  accent: '#FF7F50', // Coral accent
  orange: '#FF8C00', // Vibrant orange
  green: '#008577', // Deep teal green
  mint: '#66CC99', // Muted mint
  pink: '#FF5A6E', // Soft pink
  purple: '#7D5CFF', // Bright purple
  red: '#D32F2F', // Bold deep red
  lightblue: '#5AC8FA', // Clear light blue
  blue: '#1E90FF', // Vibrant bright blue
  lemon: '#DFF81E', // Lemon yellow
  yellow: '#FFD700', // Golden yellow
  lightgray: '#B0B0B0', // Muted light gray
  mod: '#343A40', // Deep neutral gray

  // Additional colors
  teal: '#20B2AA', // Medium teal
  skyblue: '#87CEEB', // Light sky blue
  olive: '#808000', // Olive green
  maroon: '#800000', // Rich maroon
  peach: '#FFDAB9', // Soft peach
  navy: '#000080', // Deep navy blue
  lavender: '#E6E6FA', // Pale lavender
  tan: '#D2B48C', // Tan
  cyan: '#00FFFF', // Bright cyan
  gold: '#FFD700', // Bright gold
  indigo: '#4B0082', // Deep indigo
  brown: '#A52A2A', // Warm brown
  silver: '#C0C0C0', // Sleek silver
  charcoal: '#36454F', // Dark charcoal
  ivory: '#FFFFF0', // Soft ivory
  coral: '#FF6F61', // Brighter coral
  lime: '#32CD32', // Vibrant lime
  plum: '#8E4585', // Deep plum
};

// export const darkcolors = Object.keys(colors).reduce((acc, key) => {
//   acc[key] = adjustColor(colors[key], -15); // Darken each color by 15%
//   return acc;
// }, {});
export const darkcolors = colors;
