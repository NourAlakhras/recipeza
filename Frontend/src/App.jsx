import React from "react";
import "./App.css";
import HomeNavbar from "./components/Navbar";
import CardContainer from "./components/Card";
import AddButton from "./components/addButton";
import Login from "./screens/Login";
import SignUp from "./screens/Signup";
function App() {
  return (
    <React.Fragment>
      {/* <div>
        <HomeNavbar />  
      </div>
      <div>
        <AddButton />
      </div>
      <div>
        <CardContainer />
      </div>  */}
      {/* <Login/> */}
      <SignUp />
    </React.Fragment>
  );
}

export default App;
