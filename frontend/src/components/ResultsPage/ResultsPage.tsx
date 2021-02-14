import ReactMapboxGl, { Layer, Feature, Image } from 'react-mapbox-gl';
import Plants from '../../assets/plants-plain.svg';
import 'mapbox-gl/dist/mapbox-gl.css';
import './ResultsPage.css';
import Bench from '../../assets/benchbae8.png';

const MAPBOX_TOKEN = process.env['REACT_APP_MAPBOX_TOKEN'] || '';

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN,
});

const ResultsPage = () => {
  // TODO: Get these from API in (long, lat) format
  const benchCoords = [-114.1, 51.0447];
  const eateryCoords = [-114.0, 51.0447];
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
          <Layer
            type="symbol"
            id="bench-marker"
            layout={{ 'icon-image': 'garden-15' }}
          >
            {/* @ts-ignore */}
            <Feature coordinates={benchCoords} />
          </Layer>
          <Layer
            type="symbol"
            id="eatery-marker"
            layout={{ 'icon-image': 'restaurant-15' }}
          >
            <Feature coordinates={centerCoords} />
          </Layer>
        </Map>
      </div>
    </div>
  );
};

export default ResultsPage;
