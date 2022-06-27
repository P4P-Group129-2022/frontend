import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import Routes from "./routes";
import { ScenarioContextProvider } from "./contexts/ScenarioContextProvider";
import { NotificationContextProvider } from "./contexts/NotificationContextProvider";

function App() {
  return (
    <ScenarioContextProvider>
      <NotificationContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ThemeProvider>
      </NotificationContextProvider>
    </ScenarioContextProvider>
  );
}

export default App;
