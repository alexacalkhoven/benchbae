import ReactMapboxGl, { Layer, Feature, Image, Marker } from 'react-mapbox-gl';
import Plants from '../../assets/plants-plain.svg';
import 'mapbox-gl/dist/mapbox-gl.css';
import './ResultsPage.css';
import BenchIcon from '../../assets/bench_icon.png';
import EatryIcon from '../../assets/fork_and_knife_icon.png';
import BenchBaeContext from '../../contexts/BenchBaeContext';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

const MAPBOX_TOKEN = process.env['REACT_APP_MAPBOX_TOKEN'] || '';

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
});

const ResultsPage = () => {
  const { bench, eatery } = useContext(BenchBaeContext);

  if (!bench || !eatery) {
    return <Redirect to="/" />
  }

  // TODO: Get these from API in (long, lat) format
  const benchCoords = [bench.longitude, bench.latitude];
  const eateryCoords = [eatery.geometry.location.lng, eatery.geometry.location.lat];
  const centerCoords: [number, number] = [
    (benchCoords[0] + eateryCoords[0]) / 2,
    (benchCoords[1] + eateryCoords[1]) / 2,
  ];

  return (
    <div className="results-page">
      <img className="results-plants" src={Plants} alt="" />
      <div className="results-container">
        <div className="results-bench">
          <p>Bench</p>
        </div>

        <div className="results-eatery">
          <p>Eatery</p>
        </div>
      </div>
      <div className="results-map">
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '100%',
            width: '100%',
          }}
          center={centerCoords}
        >
          <Marker coordinates={benchCoords} anchor="bottom">
            <img src={BenchIcon} className="bench-icon-map" />
          </Marker>
          <Marker coordinates={eateryCoords} anchor="bottom">
            <img src={EatryIcon} className="eatry-icon-map" />
          </Marker>
        </Map>
      </div>
    </div>
  );
};

export default ResultsPage;
