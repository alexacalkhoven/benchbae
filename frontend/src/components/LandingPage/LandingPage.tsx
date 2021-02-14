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
      <button className="bench-button">Bench Me Bitch</button>
      <img
        src={BlueWomanSitting}
        alt="Blue Woman Sitting"
        className="blue-woman-sitting"
      ></img>
      <p className="motivation">
        This is a paragraph about why we made this thing.
      </p>
    </div>
  );
}

export default LandingPage;
