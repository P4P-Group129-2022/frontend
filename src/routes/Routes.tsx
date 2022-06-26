import { Navigate, Route, Routes as Switch } from "react-router-dom";
import Dock from "../components/Dock";
import DemoPage from "../pages/DemoPage/DemoPage";
import HomePage from "../pages/HomePage/HomePage";
import MessagePage from "../pages/MessagePage/MessagePage";
import TerminalPage from "../pages/TerminalPage/TerminalPage";
import VSCodePage from "../pages/VSCodePage/VSCodePage";

function Routes() {
  return (
    <Switch>
      <Route path="/">
        <Route index element={<HomePage />} />

        <Route path="play" element={<Dock />}>
          <Route path="demo" element={<DemoPage />} />
          <Route path="terminal" element={<TerminalPage />} />
          <Route path="vscode" element={<VSCodePage />} />
          <Route path="slack" element={<MessagePage />} />
          {/* All unregistered routes inside play direct to play page. */}
          <Route path="*" element={<Navigate to="/play" />} />
        </Route>

        {/* All unregistered routes direct to home page. */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Route>
    </Switch>
  );
}

export default Routes;
