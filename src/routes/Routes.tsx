import { Navigate, Route, Routes as Switch } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";

function Routes() {
  return (
    <Switch>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Switch>
  );
}

export default Routes;
