import React, { Component } from 'react';
import './LandingPage.css';
import Logo from '../../assets/benchbae8.png';
import TwoPeople from '../../assets/two-people-standing.svg';
import BlueWomanSitting from '../../assets/blue-woman-sitting.svg';

function LandingPage() {
  return (
    <div className="landingpage-main">
      <img src={Logo} alt="Logo" className="logo"></img>
      <h1 className="bench-bae">BenchBae</h1>
      <img src={TwoPeople} alt="Logo" className="two-people"></img>
      <button className="bench-button">Bench Me</button>
      <img
        src={BlueWomanSitting}
        alt="Blue Woman Sitting"
        className="blue-woman-sitting"
      ></img>
      <p className="motivation">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  );
}

export default LandingPage;
