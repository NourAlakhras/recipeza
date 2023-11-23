import React from "react";
import "./App.css";
import HomeNavbar from "./components/Navbar";
import CardContainer from "./components/Card";
import AddButton from "./components/addButton";
//import LoginUi from "./screens/LoginUi";
function App() {
  return (
    <React.Fragment>
      <div>
         <HomeNavbar />  
      </div>
      <div>
        <AddButton />
      </div>
      <div>
        <CardContainer />
      </div> 
      {/* <LoginUi /> */}
     
     
    </React.Fragment>
  );
}

export default App;
