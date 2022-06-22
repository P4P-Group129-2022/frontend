import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import Routes from "./routes";
import { ScenarioContextProvider } from "./contexts/ScenarioContextProvider";

function App() {
  return (
    <ScenarioContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </ScenarioContextProvider>
  );
}

export default App;
