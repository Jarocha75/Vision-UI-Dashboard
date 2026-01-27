import { type SxProps, type Theme } from "@mui/material";

/**
 * Common Card Styles
 */
export const cardStyles = {
  // Basic glass card with overlay
  glassCard: (theme: Theme): SxProps<Theme> => ({
    position: "relative",
    overflow: "hidden",
    borderRadius: "20px",
    background: theme.palette.card.overlay,
    backdropFilter: "blur(120px)",
  }),

  // Basic card without overlay
  basicCard: (theme: Theme): SxProps<Theme> => ({
    position: "relative",
    overflow: "hidden",
    borderRadius: "28px",
    background: theme.palette.card.basic,
    backdropFilter: "blur(120px)",
  }),

  // Card with gradient overlay
  gradientCard: (theme: Theme): SxProps<Theme> => ({
    position: "relative",
    overflow: "hidden",
    borderRadius: "12px",
    background: theme.palette.card.gradientOverlay,
    boxShadow: "0px 4px 14px rgba(0,0,0,0.3)",
  }),

  // Mini card with dark gradient
  miniCard: (): SxProps<Theme> => ({
    borderRadius: "16px",
    background:
      "linear-gradient(135deg, rgba(6,11,38,0.94), rgba(26,31,55,0.94))",
  }),
};

/**
 * Common Typography Styles
 */
export const typographyStyles = {
  // Card title
  cardTitle: (theme: Theme): SxProps<Theme> => ({
    fontSize: { xs: 16, md: 18 },
    fontWeight: 700,
    color: theme.palette.text.primary,
  }),

  // Card subtitle/label
  cardLabel: (theme: Theme): SxProps<Theme> => ({
    fontSize: { xs: 10, md: 12 },
    fontWeight: 400,
    color: theme.palette.text.secondary,
    textTransform: "uppercase",
  }),

  // Body text primary
  bodyPrimary: (theme: Theme): SxProps<Theme> => ({
    fontSize: { xs: 12, md: 14 },
    fontWeight: 400,
    color: theme.palette.text.primary,
  }),

  // Body text secondary
  bodySecondary: (theme: Theme): SxProps<Theme> => ({
    fontSize: { xs: 11, md: 14 },
    fontWeight: 400,
    color: theme.palette.text.secondary,
  }),

  // Large value display
  valueDisplay: (theme: Theme): SxProps<Theme> => ({
    fontSize: { xs: 20, md: 24, lg: 34 },
    fontWeight: 700,
    color: theme.palette.text.primary,
  }),

  // Small value display
  smallValue: (theme: Theme): SxProps<Theme> => ({
    fontSize: { xs: 14, md: 16, lg: 18 },
    fontWeight: 600,
    color: theme.palette.text.primary,
  }),
};

/**
 * Common Box/Container Styles
 */
export const containerStyles = {
  // Flex center alignment
  flexCenter: (): SxProps<Theme> => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),

  // Flex space between
  flexBetween: (): SxProps<Theme> => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),

  // Icon container with gradient background
  iconContainer: (theme: Theme): SxProps<Theme> => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    width: { xs: 40, md: 46 },
    height: { xs: 40, md: 46 },
    background: theme.palette.icon.blueGradient,
    flexShrink: 0,
  }),

  // Absolute positioned overlay
  overlay: (theme: Theme): SxProps<Theme> => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: theme.palette.card.overlay,
    zIndex: 2,
  }),
};

/**
 * Common Spacing Configurations
 */
export const spacing = {
  cardPadding: {
    xs: 2,
    md: 2.5,
    lg: 3,
  },
  smallCardPadding: {
    xs: 1.5,
    md: 2,
  },
  responsiveGap: {
    xs: 0.75,
    md: 1,
    lg: 1.5,
  },
};

/**
 * Common Responsive Heights
 */
export const heights = {
  smallCard: {
    xs: 160,
    sm: 180,
    md: 200,
    lg: 240,
  },
  mediumCard: {
    xs: 240,
    md: 300,
    lg: 340,
  },
  miniCard: {
    xs: 80,
    md: 84,
  },
};

/**
 * Common Border Radius Values
 */
export const borderRadius = {
  small: "12px",
  medium: "16px",
  large: "20px",
  xLarge: "28px",
};

/**
 * Utility function to merge SxProps
 */
export const mergeSx = (
  ...styles: (SxProps<Theme> | undefined)[]
): SxProps<Theme> => {
  return styles.filter(Boolean).reduce<SxProps<Theme>>((acc, style) => {
    if (!style) return acc;
    if (Array.isArray(style)) {
      return [...(Array.isArray(acc) ? acc : [acc]), ...style];
    }
    return Array.isArray(acc) ? [...acc, style] : [acc, style];
  }, {});
};

/**
 * Common hover effects
 */
export const hoverEffects = {
  lift: (): SxProps<Theme> => ({
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    },
  }),

  scale: (): SxProps<Theme> => ({
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
    },
  }),

  opacity: (): SxProps<Theme> => ({
    transition: "opacity 0.2s ease-in-out",
    "&:hover": {
      opacity: 0.8,
    },
  }),
};

/**
 * Common color utilities
 */
export const colorUtils = {
  // Get color based on positive/negative value
  getAmountColor: (amount: string, theme: Theme): string => {
    const isNegative = amount?.startsWith("-") ?? false;
    return isNegative ? theme.palette.error.main : theme.palette.success.main;
  },

  // Get color based on change value
  getChangeColor: (change: string): string => {
    return change.startsWith("-") ? "#f5365c" : "#5BE374";
  },
};
