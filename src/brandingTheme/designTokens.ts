import { alpha, darken } from "@mui/system";

import { ThemeOptions } from "@mui/material";
import defaultTheme from "./defaultTheme";
import nord from "nord";
import systemFonts from "./systemFonts";

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    sectionPrimary: string,
    sectionSecondary: string,
    sectionTertiary: string
  }
}

declare module "@mui/material/styles/createTypography" {
  interface TypographyOptions {
    fontWeightExtraBold?: number;
  }

  interface Typography {
    fontWeightExtraBold: number;
  }
}

const designTokens: Omit<ThemeOptions, "components"> = {
  unstable_strictMode: true,
  palette: {
    mode: "dark",
    common: {
      black: nord.nord0
    },
    primary: {
      main: nord.nord8,
      contrastText: nord.nord1
    },
    secondary: {
      main: nord.nord0,
      contrastText: nord.nord8
    },
    error: {
      main: nord.nord11,
      contrastText: nord.nord6
    },
    warning: {
      main: nord.nord13,
      contrastText: nord.nord1
    },
    info: {
      main: nord.nord7,
      contrastText: nord.nord1
    },
    success: {
      main: nord.nord14,
      contrastText: nord.nord1
    },
    text: {
      primary: nord.nord6,
      secondary: darken(nord.nord6, .27),
      disabled: darken(nord.nord6, .47)
    },
    divider: alpha(nord.nord4, .5),
    background: {
      default: nord.nord0,
      sectionPrimary: nord.nord1,
      sectionSecondary: darken(nord.nord0, .1),
      sectionTertiary: darken(nord.nord0, .2)
    },
    action: {
      active: nord.nord6,
      hover: alpha(nord.nord6, .04),
      selected: alpha(nord.nord6, .08),
      disabled: alpha(nord.nord6, .26),
      disabledBackground: alpha(nord.nord6, .12),
      focus: alpha(nord.nord6, .12)
    }
  },
  spacing: 10,
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: systemFonts.join(","),
    fontWeightExtraBold: 800,
    h1: {
      fontSize: "clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)",
      fontWeight: 800,
      lineHeight: 78 / 70
    },
    h2: {
      fontSize: "clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)",
      fontWeight: 800,
      lineHeight: 44 / 36
    },
    h3: {
      fontSize: defaultTheme.typography.pxToRem(36),
      lineHeight: 44 / 36,
      letterSpacing: 0
    },
    h4: {
      fontSize: defaultTheme.typography.pxToRem(28),
      lineHeight: 42 / 28,
      letterSpacing: 0
    },
    h5: {
      fontSize: defaultTheme.typography.pxToRem(24),
      lineHeight: 36 / 24,
      letterSpacing: 0
    },
    h6: {
      fontSize: defaultTheme.typography.pxToRem(20),
      lineHeight: 30 / 20,
      letterSpacing: 0
    },
    button: {
      textTransform: "capitalize",
      fontWeight: 700,
      letterSpacing: 0
    },
    subtitle1: {
      fontSize: defaultTheme.typography.pxToRem(18),
      lineHeight: 24 / 18,
      letterSpacing: 0,
      fontWeight: 500
    },
    body1: {
      fontSize: defaultTheme.typography.pxToRem(16),
      lineHeight: 24 / 16,
      letterSpacing: 0
    },
    body2: {
      fontSize: defaultTheme.typography.pxToRem(14),
      lineHeight: 21 / 14,
      letterSpacing: 0
    },
    caption: {
      display: "inline-block",
      fontSize: defaultTheme.typography.pxToRem(12),
      lineHeight: 18 / 12,
      letterSpacing: 0,
      fontWeight: 700
    }
  }
};

export default designTokens;