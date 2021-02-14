import Plants from '../../assets/plants-plain.svg';
import './ResultsPage.css';

const ResultsPage = () => {
  return (
    <div className="results-page">
      <img className="results-plants" src={Plants} alt="" />
      <div className="results-container">
        <div className="results-bench">
          <p>Bench</p>
        </div>

        <div className="results-restaurant">
          <p>Restaurant</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
