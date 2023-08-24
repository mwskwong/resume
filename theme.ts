import { extendTheme } from "@mui/joy/styles";
import { Rubik } from "next/font/google";

declare module "@mui/joy/styles/types/zIndex" {
  interface ZIndexOverrides {
    header: true;
  }
}

declare module "@mui/joy/styles" {
  interface FontSizeOverrides {
    xl7: true;
    xl6: true;
    xl5: true;
  }
}

declare module "@mui/joy/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    branding: true;
  }
}

const rubik = Rubik({ subsets: ["latin"] });
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: "var(--joy-palette-common-white)",
          level1: "var(--joy-palette-neutral-50)",
          level2: "var(--joy-palette-neutral-100)",
          level3: "var(--joy-palette-neutral-200)",
        },
      },
    },
    dark: {
      palette: {
        background: {
          level1: "var(--joy-palette-neutral-900)",
          level2: "var(--joy-palette-neutral-800)",
          level3: "var(--joy-palette-neutral-700)",
        },
      },
    },
  },
  fontFamily: {
    body: rubik.style.fontFamily,
    display: rubik.style.fontFamily,
  },
  fontSize: {
    xl7: "4.5rem",
    xl6: "3.75rem",
    xl5: "3rem",
  },
  zIndex: {
    header: 1100,
  },
  components: {
    JoyLink: {
      styleOverrides: {
        root: {
          userSelect: "unset",
        },
      },
    },
    JoyStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export default theme;
