import { createTheme } from "@mui/material";

const theme = createTheme({
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
  typography: {
    fontFamily: `"Inter", "Roboto Mono", "Roboto", "sans-serif", "Arial"`,
    fontSize: 12,
  },
});

export default theme;
