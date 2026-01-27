import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    navbar: {
      main: string;
      gradient: string;
    };
    card: {
      basic: string;
      overlay: string;
      chart: string;
      glass: string;
      highlighted: string;
      gradientOverlay: string;
    };
    icon: {
      blue: string;
      blueGradient: string;
    };
  }

  interface PaletteOptions {
    navbar?: {
      main: string;
      gradient: string;
    };
    card?: {
      basic?: string;
      overlay?: string;
      chart?: string;
      glass?: string;
      highlighted?: string;
      gradientOverlay?: string;
    };
    icon?: {
      blue: string;
      blueGradient: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#3A7BFF",
      light: "#63A4FF",
      dark: "#0066FF",
    },

    secondary: {
      main: "#8392AB",
    },

    success: {
      main: "#5BE374",
    },

    error: {
      main: "#F5365C",
    },

    warning: {
      main: "#FB6340",
    },

    info: {
      main: "#11CDEF",
    },

    background: {
      default: "#060B28",
      paper: "transparent",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#A0AEC0",
    },

    navbar: {
      main: "#0f1535",
      gradient: "linear-gradient(135deg, rgba(6, 11, 40, 0.3) 0%, rgba(10, 14, 35, 0.25) 100%)",
    },

    card: {
      // 🎨 BASIC - Základný gradient pre väčšinu kariet (SalesOverview, atď.)
      basic: `
        linear-gradient(
          126.97deg,
          rgba(10, 18, 65, 0.85) 28.26%,
          rgba(15, 22, 60, 0.8) 91.2%
        )
      `,

      // 🌊 OVERLAY - Pre karty s obrázkami (WelcomeCard - medúza)
      overlay: `
        linear-gradient(
          127.09deg,
          rgba(6, 11, 40, 0.94) 19.41%,
          rgba(10, 14, 35, 0.49) 76.65%
        )
      `,

      // 📊 CHART - Pre grafy a chart pozadia (Active Users)
      chart: `
        linear-gradient(
          126.97deg,
          #060C29 28.26%,
          rgba(4, 12, 48, 0.5) 91.2%
        )
      `,

      // ✨ GLASS - Sklenený efekt
      glass: "rgba(255,255,255,0.04)",

      // 🔵 HIGHLIGHTED - Pre zvýraznené karty (modrý odtieň)
      highlighted: `
        linear-gradient(
          135deg,
          rgba(10, 20, 60, 0.9) 0%,
          rgba(15, 25, 50, 0.85) 100%
        )
      `,

      // LEGACY - Pre spätnú kompatibilitu
      gradientOverlay: `
        linear-gradient(
          135deg,
          rgba(6, 11, 40, 0.9) 0%,
          rgba(10, 14, 35, 0.75) 100%        )
      `,
    },

    icon: {
      blue: "#3A7BFF",
      blueGradient: "linear-gradient(135deg, #3A7BFF 0%, #0066FF 100%)",
    },
  },

  typography: {
    fontFamily: `"Plus Jakarta Sans", sans-serif`,

    h1: { fontSize: "2.5rem", fontWeight: 700 },
    h2: { fontSize: "2rem", fontWeight: 700 },
    h3: { fontSize: "1.75rem", fontWeight: 600 },
    h4: { fontSize: "1.4rem", fontWeight: 600 },
    h5: { fontSize: "1.2rem", fontWeight: 600 },
    h6: { fontSize: "1.05rem", fontWeight: 600 },

    body1: { fontSize: "0.95rem", fontWeight: 400 },
    body2: { fontSize: "0.85rem", fontWeight: 300 },

    button: { fontWeight: 600 },
  },

  shape: {
    borderRadius: 20,
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: `
        linear-gradient(
          135deg,
          rgba(6, 11, 40, 0.95) 0%,
          rgba(10, 14, 35, 0.85) 100%
        )
      `,
          backdropFilter: "blur(42px)",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.6)",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#060B28",
          backgroundImage:
            "linear-gradient(180deg, rgba(6,11,40,0.98) 0%, rgba(10,14,35,0.95) 100%)",
          borderRight: "1px solid rgba(255,255,255,0.04)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: `
        linear-gradient(
          135deg,
          rgba(6, 11, 40, 0.9) 0%,
          rgba(10, 14, 35, 0.75) 100%
        )
      `,
          backdropFilter: "blur(120px)",
          boxShadow: "0px 20px 40px rgba(0,0,0,0.4)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          background: "transparent",
          boxShadow: "none",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          padding: "10px 22px",
          fontWeight: 600,
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #3A7BFF 0%, #0066FF 100%)",
          boxShadow: "0px 4px 14px rgba(0, 102, 255, 0.35)",
        },
      },
    },
  },
});

export default theme;
