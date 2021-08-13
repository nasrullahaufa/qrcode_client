import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import ChangePasswordPage from "./pages/ChangePassword";
import ProtectedRoute from "./helpers/protected.route";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <ProtectedRoute path="/changepassword" component={ChangePasswordPage}  />
        <ProtectedRoute path="/" component={HomePage} />
     
     
      </Switch>
    </Router>
  );
}

export default App;
