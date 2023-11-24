import App from "./App.jsx";
import UserProfile from "./screens/UserProfile.jsx";
import Login from "./screens/Login.jsx";
import SignUp from "./screens/Signup.jsx";

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min.js";

function Index() {
  return (
    <Router>
      <div className="Home">
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/user-profile">
            <UserProfile />
          </Route>
          <Route  path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Index;
