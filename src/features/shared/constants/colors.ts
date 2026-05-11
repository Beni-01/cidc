export const colors = {
  deepGreen: "#1B3A2D",
  deepGreenLight: "#2A5A42",
  deepGreenDark: "#0F2A1E",
  cream: "#FAF7F2",
  creamLight: "#FFFDF8",
  creamDark: "#F0EBE3",
  gold: "#C9A84C",
  goldLight: "#D4BA6A",
  goldDark: "#B8963A",
  navy: "#1A2238",
  navyLight: "#2A3552",
  white: "#FFFFFF",
  black: "#111111",
  textPrimary: "#1B1B1B",
  textSecondary: "#4A4A4A",
  textMuted: "#7A7A7A",
  textLight: "#FFFFFF",
} as const;

export type ColorKey = keyof typeof colors;
