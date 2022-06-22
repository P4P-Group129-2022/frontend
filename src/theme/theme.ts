import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: `"Inter", "Roboto Mono", "Roboto", "sans-serif", "Arial"`,
    fontSize: 12,
  },
  // palette: {
  //   primary: {},
  //   secondary: {},
  // },
  // typography: {
  //   fontFamily: `"Roboto Mono", "Roboto", "sans-serif", "Arial"`,
  //   fontSize: 14,
  //   fontWeightRegular: 400,
  //   fontWeightMedium: 600,
  //   fontWeightBold: 700,
  //   button: {
  //     textTransform: "none",
  //   },
  //   h1: {
  //     fontWeight: "bold",
  //     fontSize: 48,
  //     marginBottom: "10vh",
  //     textAlign: "center",
  //   },
  //   h2: {
  //     fontWeight: "bold",
  //     fontSize: 28,
  //     marginBottom: "10vh",
  //     textAlign: "center",
  //   }
  // },
  palette: {
    mode: "dark",
    primary: {
      light: "#adff00",
      main: "#4fcc4d",
      dark: "#3DA93B",
    },
    secondary: {
      light: "#FFFFFF",
      main: "#373535",
      dark: "#1F1F1F",
    },
  },
});

export default theme;
