import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import HealthIcon from '../../assets/health_icon.png';
import CovidIcon from '../../assets/covid_icon.png';
import DateIcon from '../../assets/date_icon.png';
import LandingImage from '../../assets/landing_image.png';
import BenchBaeContext from '../../contexts/BenchBaeContext';
import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import './LandingPage.css';

const LandingPage = () => {
  const history = useHistory();
  const { requestBench, requestEatery, loading } = useContext(BenchBaeContext);
  const motivationRef = useRef<any>(null);

  const findBench = () => {
    requestBench()
      .then((bench) => {
        requestEatery(bench)
          .then(() => {
            history.push('/results');
          })
          .catch(err => {
            alert('Error: ' + err);
            console.error(err);
          });
      })
      .catch(err => {
        alert('Error: ' + err);
        console.error(err);
      });
  };

  const scroll = () => {
    if (!motivationRef || !motivationRef.current) return;
    motivationRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landingpage-main">
      <div className="landingpage-content">
        <div className="landingpage-front">
          <Nav fade={true} />

          <div className="landingpage-image-container">
            <p className="landingpage-image-pretext">
              Click below to find your BenchBae date combination!
              <br />
              (Currently only displaying bench results in Calgary, Canada)
            </p>
            <img className="landingpage-image" src={LandingImage} alt="" />
          </div>

          {loading ? (
            <div className="landingpage-loading">
              <div className="landingpage-loading-container">
                <CircularProgress />
              </div>
            </div>
          ) : (
            <button className="landingpage-button" onClick={() => findBench()}>
              Find your date
            </button>
          )}

          <div className="landingpage-expand-icon arrow-bounce">
            <span className="material-icons" onClick={() => scroll()}>
              expand_more
            </span>
          </div>
        </div>

        <div className="motivation-container" ref={motivationRef}>
          <p className="motivation-title">About Us</p>
          <p className="motivation-pretext">
            BenchBae was inspired by a dataset detailing Calgary’s park benches
            from Calgary’s municipal open-source data. Read more about our story
            below!
          </p>
          <div className="motivation-content">
            <div className="motivation-section">
              <div className="motivation-icon">
                <img src={CovidIcon} alt="Covid" />
              </div>
              <p>
                It’s no secret that the COVID-19 pandemic has had devastating
                effects on our local economy. From temporary closures to reduced
                capacity, increased sanitization costs and significantly lower
                revenue, Calgarian restaurants have been slowly suffocating
                under the weight of the economic downturn. A survey conducted by
                Statistics Canada showed that nearly 30 percent of businesses in
                the Food and Drink sector reported that they would be
                operationally viable for only six more months until facing
                drastic measures. We aim to help this problem by giving more
                exposure to Calgary’s restaurants, stimulating our economy.
              </p>
            </div>
            <div className="motivation-section">
              <div className="motivation-icon">
                <img src={HealthIcon} alt="Mental health" />
              </div>
              <p>
                Mental health concerns have become more and more pressing over
                the years. Due to COVID-19, the mental health of many Calgarians
                has deteriorated. Because of this pandemic, 24% of participants
                in a study reported fair or poor mental health. This is a
                massive jump from the previous 2018 survey where 8% of Canadians
                reported fair or poor mental health. Most participants
                experienced at least one symptom of anxiety in the two weeks
                prior to completing the survey. We strive to contribute a safe,
                new way for friends, family and couples around Calgary to
                relieve some stress and get out of the house.
              </p>
            </div>
            <div className="motivation-section">
              <div className="motivation-icon">
                <img src={DateIcon} alt="Date night" />
              </div>
              <p>
                BenchBae puts an innovative twist on the standard date night
                process. Our application lets users find the closest west-facing
                bench to watch the sunset with their partner. This spontaneous
                and intimate experience is elevated with a hearty meal from a
                nearby restaurant as recommended by our app. The result is an
                experience that not only stimulates the local economy but allows
                users to safely enjoy the company of their loved ones with a
                beautiful Calgary sunset backdrop. In the future, we hope to
                continually improve BenchBae and magnify our impact on Calgary’s
                future. We would love to focus our restaurant recommendations on
                local businesses, further helping the business owners who need
                it most.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
