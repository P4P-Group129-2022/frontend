import { Navigate, Route, Routes as Switch } from "react-router-dom";
import Dock from "../components/Dock";
import HomePage from "../pages/HomePage/HomePage";
import MessagePage from "../pages/MessagePage/MessagePage";
import TerminalPage from "../pages/TerminalPage/TerminalPage";
import VSCodePage from "../pages/VSCodePage/VSCodePage";
import ScenarioSelectPage from "../pages/ScenarioSelectPage/ScenarioSelectPage";
import OrgInvitePage from "../pages/OrgInvitePage/OrgInvitePage";

function Routes() {
  return (
    <Switch>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="scenario-select" element={<ScenarioSelectPage />} />

        <Route path="scenario" element={<Dock />}>
          <Route path="invite" element={<OrgInvitePage />} />
          <Route path="terminal" element={<TerminalPage />} />
          <Route path="vscode" element={<VSCodePage />} />
          <Route path="slack" element={<MessagePage />} />
          {/* All unregistered routes inside play direct to play page. */}
          <Route path="*" element={<Navigate to="/scenario" />} />
        </Route>

        {/* All unregistered routes direct to home page. */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Switch>
  );
}

export default Routes;
