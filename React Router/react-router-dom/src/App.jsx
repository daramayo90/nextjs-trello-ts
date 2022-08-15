import React, { useState } from 'react';
import logo from './logo.png';
import './App.css';
import Home from './components/Home';
import Navigation from './components/Navigation';

function App () {
  const [isLogo, setIsLogo] = useState(true);

  const toggleLogo = () => {
    setIsLogo(!isLogo);
  }

  const openNav = () => {
    document.getElementById("myNav").style.width = "100%";
  }

  const closeNav = () => {
    document.getElementById("myNav").style.width = "0%";
  }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo}
            className={isLogo ? 'static-logo' : 'static-logo animated jello'} 
            alt="logo"
            onMouseEnter={toggleLogo}
            onMouseLeave={toggleLogo}
            onClick={openNav}
          />
          <h1 className={isLogo ? 'menu-hidden' : 'menu animated bounceInDown'} onClick={openNav}>
            Menu
          </h1>
          <Navigation closeNav={closeNav} />
        </header>
        <Home />
      </div>
    );
}

export default App;
