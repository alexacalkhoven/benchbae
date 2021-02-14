import ReactMapboxGl, {
  Layer,
  Feature,
  Image,
  Marker,
  Popup,
} from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './ResultsPage.css';
import BenchIcon from '../../assets/bench_icon.png';
import EateryIcon from '../../assets/fork_and_knife_icon.png';
import BenchBaeContext from '../../contexts/BenchBaeContext';
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Nav from '../Nav/Nav';

const MAPBOX_TOKEN = process.env['REACT_APP_MAPBOX_TOKEN'] || '';

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
});

const ResultsPage = () => {
  const { bench, eatery } = useContext(BenchBaeContext);
  const [benchPopupOpen, setBenchPopupOpen] = useState(false);
  const [eateryPopupOpen, setEateryPopupOpen] = useState(false);

  if (!bench || !eatery) {
    return <Redirect to="/" />;
  }

  // TODO: Get these from API in (long, lat) format
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

        {/* <div className="results-container">
          <div className="results-bench">
            <p>Bench</p>
          </div>

          <div className="results-eatery">
            <p>Eatery</p>
          </div>
        </div> */}
        <div className="results-map">
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: '100%',
              width: '100%',
            }}
            center={centerCoords}
          >
            {benchPopupOpen ? (
              <Popup
                coordinates={benchCoords}
                offset={{
                  bottom: [0, -32],
                }}
              >
                <p>Bench?!</p>
                <button onClick={() => setBenchPopupOpen(false)}>Close</button>
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
                <p>eatery!!!!?!</p>
                <button onClick={() => setEateryPopupOpen(false)}>Close</button>
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
          <p className="results-hint">Click the icons for more info</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
