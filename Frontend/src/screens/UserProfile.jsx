import { useState } from 'react'

import '../styles/userProfile.css'

function UserProfile() {
  const [activeTab, setActiveTab] = useState('my-recipes');

  const showTab = (tabId) => {
    setActiveTab(tabId);
  };

  
  return (
    <>
   <div className='bodyContainer'>
   <h1> User Profile Page</h1>
   </div>
   
   <div className="container">
   <div className="profile-box">
    <img src="src/assets/profile-user.png" alt="Profile Picture" className="profile-picture"/>
    <div className="profile-name">Sarah</div>
    <div className="profile-description"></div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
  <div className ="about-box">
  <h2> About Me </h2>
  <p> My cooking philosophy revolves around the simplicity of fresh, quality ingredients.
     I believe that great meals start with the best components,
     treated with respect and care. Whether  a comforting family dinner or an elaborate feast for friends,
     each dish is an expression of creativity, flavor, and love.
     </p>
     </div>
     </div>

     <div className="division-line"></div>
     <div className="App">
      {/* Tabs */}
      <div className="tabs">
        <div
          className={activeTab === 'my-recipes' ? 'active-tab' : ''}
          onClick={() => showTab('my-recipes')}
        >
          My Recipes
        </div>
        <div
          className={activeTab === 'saved-recipes' ? 'active-tab' : ''}
          onClick={() => showTab('saved-recipes')}
        >
          Saved Recipes
        </div>
      </div>
    
      {/* Tab Content */}
      <div className="tab-content" id="my-recipes" style={{ display: activeTab === 'my-recipes' ? 'flex' : 'none' }}>
        
        {/* Recipe Boxes for My Recipes */}
        <div className="recipe-box">
          <img src="src/assets/Recipe1.jpeg" alt="Recipe 1" className="recipe-picture" />
          <h3>Red Macaroni</h3>
          <p>This pasta creation is a perfect harmony of tangy tomato sauce, aromatic herbs,
             and perfectly cooked macaroni.
            </p>
        </div>
        <div className="recipe-box">
          <img src="src/assets/Recipe2.png" alt="Recipe 2" className="recipe-picture" />
          <h3>Fettucine</h3>
          <p>This velvety and luscious pasta is coated in a silky smooth Alfredo sauce, 
            rich with the perfect balance of butter, cream, and Parmesan cheese</p>
        </div>
        <div className="recipe-box">
          <img src="src/assets/recipe3.png" alt="Recipe 3" className="recipe-picture" />
          <h3>Recipe 3</h3>
          <p>Description of Recipe 3.</p>
        </div>
        {/* Add more recipe boxes as needed */}
      </div>

      {/* Tab Content (Hidden initially) */}
      <div className="tab-content" id="saved-recipes" style={{ display: activeTab === 'saved-recipes' ? 'flex' : 'none' }}>
       
        {/* Recipe Boxes for Saved Recipes */}
        {/* Add saved recipe boxes as needed */}
      </div>
    </div>
  
         </>
  );
  }
export default UserProfile;