import App from "./App.jsx";
import UserProfile from "./screens/UserProfile.jsx";
import Login from "./screens/Login.jsx";
import SignUp from "./screens/Signup.jsx";
import RecipePage from "./screens/RecipePage.jsx";
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';


// Update your usage of Switch to Routes
function Index() {
  return (
    <Router>
      <div className="Home">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Index;
