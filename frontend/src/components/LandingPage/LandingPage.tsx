import React, { Component } from 'react';
import './LandingPage.css';
import Logo from '../../assets/benchbae8.png';
import TwoPeople from '../../assets/two-people-standing.svg';

function LandingPage() {
  return (
    <div className="landingpage-main">
      <img src={Logo} alt="Logo" className="logo"></img>
      <h1>BenchBae</h1>
      <img src={TwoPeople} alt="Logo" className="two-people"></img>
      <button className="bench-button">Bench Me Bitch</button>
    </div>
  );
}

export default LandingPage;
