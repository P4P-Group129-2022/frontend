import { Navigate, Route, Routes as Switch } from "react-router-dom";
import DemoPage from "../pages/DemoPage/DemoPage";
import HomePage from "../pages/HomePage/HomePage";

function Routes() {
  return (
    <Switch>
      <Route path="/">
        <Route index element={<HomePage />} />

        <Route path="demo" element={<DemoPage />} />

        {/* All unregistered routes direct to home page. */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Switch>
  );
}

export default Routes;
