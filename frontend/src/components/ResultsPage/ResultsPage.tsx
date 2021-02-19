import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './ResultsPage.css';
import BenchIcon from '../../assets/bench_icon.png';
import EateryIcon from '../../assets/fork_and_knife_icon.png';
import UserIcon from '../../assets/user_icon.png';
import BenchBaeContext from '../../contexts/BenchBaeContext';
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const MAPBOX_TOKEN = process.env['REACT_APP_MAPBOX_TOKEN'] || '';

const FACING_MAP: { [key: string]: string } = {
  W: 'West',
  NW: 'North-West',
  SW: 'South-West',
};

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
});

const ResultsPage = () => {
  const { bench, eatery, userLocation } = useContext(BenchBaeContext);
  const [benchPopupOpen, setBenchPopupOpen] = useState(false);
  const [eateryPopupOpen, setEateryPopupOpen] = useState(false);
  const [userPopupOpen, setUserPopupOpen] = useState(false);

  if (!bench || !eatery) {
    return <Redirect to="/" />;
  }

  // Coordinates for map in (long, lat) format
  const userCoords = [userLocation.long, userLocation.lat];
  const benchCoords = [bench.longitude, bench.latitude];
  const eateryCoords = [
    eatery.geometry.location.lng,
    eatery.geometry.location.lat,
  ];
  const centerCoords: [number, number] = [
    (benchCoords[0] + eateryCoords[0]) / 2,
    (benchCoords[1] + eateryCoords[1]) / 2,
  ];

  return (
    <div className="results-main">
      <div className="results-content">
        <Nav />
        <div className="results-map">
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: '100%',
              width: '100%',
            }}
            center={centerCoords}
          >
            {userPopupOpen ? (
              <Popup
                coordinates={userCoords}
                offset={{
                  bottom: [0, -32],
                }}
              >
                <p>This is your current location</p>
                <button
                  className="popup-close-button"
                  onClick={() => setUserPopupOpen(false)}
                >
                  Close
                </button>
              </Popup>
            ) : (
              <></>
            )}
            <Marker
              coordinates={userCoords}
              onClick={() => setUserPopupOpen(true)}
              anchor="bottom"
            >
              <img src={UserIcon} alt="User" className="user-icon-map" />
            </Marker>
            {benchPopupOpen ? (
              <Popup
                coordinates={benchCoords}
                offset={{
                  bottom: [0, -32],
                }}
              >
                <p>
                  This is the nearest bench
                  <br />
                  Faces {FACING_MAP[bench.orientation] || 'West'}
                  <br />
                  {bench.location_detail}
                </p>
                <button
                  className="popup-close-button"
                  onClick={() => setBenchPopupOpen(false)}
                >
                  Close
                </button>
              </Popup>
            ) : (
              <></>
            )}
            <Marker
              coordinates={benchCoords}
              onClick={() => setBenchPopupOpen(true)}
              anchor="bottom"
            >
              <img src={BenchIcon} alt="Bench" className="bench-icon-map" />
            </Marker>
            {eateryPopupOpen ? (
              <Popup
                coordinates={eateryCoords}
                offset={{
                  bottom: [0, -32],
                }}
              >
                <p>
                  {eatery.name}
                  <br />
                  {eatery.vicinity}
                </p>
                <button
                  className="popup-close-button"
                  onClick={() => setEateryPopupOpen(false)}
                >
                  Close
                </button>
              </Popup>
            ) : (
              <></>
            )}
            <Marker
              coordinates={eateryCoords}
              onClick={() => setEateryPopupOpen(true)}
              anchor="bottom"
            >
              <img src={EateryIcon} alt="Eatery" className="eatery-icon-map" />
            </Marker>
          </Map>
          <p className="results-hint results-desc">
            We found you a west-facing bench for you to watch the sunset on your
            date, along with a nearby, highly-rated restaurant.
            <br />
            Click the icons for more info.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResultsPage;
