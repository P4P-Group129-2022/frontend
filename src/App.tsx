import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";
import Routes from "./routes";
import { ScenarioContextProvider } from "./contexts/ScenarioContextProvider";
import { NotificationContextProvider } from "./contexts/NotificationContextProvider";
import { MessageContextProvider } from "./contexts/MessageContextProvider";
import { UserContextProvider } from "./contexts/UserContextProvider";

function App() {
  return (
    <UserContextProvider>
      <MessageContextProvider>
        <NotificationContextProvider>
          <ScenarioContextProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <BrowserRouter>
                <Routes />
              </BrowserRouter>
            </ThemeProvider>
          </ScenarioContextProvider>
        </NotificationContextProvider>
      </MessageContextProvider>
    </UserContextProvider>
  );
}

export default App;
