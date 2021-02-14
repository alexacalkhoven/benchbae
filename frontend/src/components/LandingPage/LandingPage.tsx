import Nav from '../Nav/Nav';
import './LandingPage.css';
import TwoPeople from '../../assets/two-people-standing.svg';
import ManPurpleSitting from '../../assets/man-purple-sitting.svg';
import WomanPinkStanding from '../../assets/woman-pink-standing.svg';
import PlantsPlain from '../../assets/plants-plain.svg';
import BenchBaeContext from '../../contexts/BenchBaeContext';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const LandingPage = () => {
  const history = useHistory();
  const { requestBench, requestEatery, loading } = useContext(BenchBaeContext);

  const findBench = () => {
    requestBench()
      .then((bench) => {
        requestEatery(bench)
          .then(() => {
            history.push('/results');
          })
          .catch(console.error);
      })
      .catch(console.error);
  };

  return (
    <div className="landingpage-main">
      <div className="landingpage-content">
        <Nav fade={true} />

        <img src={TwoPeople} alt="Logo" className="landingpage-image"/>
        {/* <img src={PlantsPlain} alt="Plants" className="landingpage-image" /> */}

        {/* <img src={ManPurpleSitting} alt="" />
        <img src={WomanPinkStanding} alt="" /> */}

        {loading ? (
          <div className="landingpage-loading">
            <div className="landingpage-loading-container">
              <CircularProgress />
            </div>
          </div>
        ) : (
          <button className="landingpage-button" onClick={() => findBench()}>
            Bench Me
          </button>
        )}

        <div className="landingpage-expand-icon arrow-bounce">
          <span className="material-icons">expand_more</span>
        </div>

        <p className="motivation">
          BenchBae was inspired by a dataset detailing the city’s memorial and
          park bench data from Calgary’s municipal open-source data.
        </p>
        <p className="motivation">
          It’s no secret that the covid-19 pandemic has had devastating effects
          on our local economy. From temporary closures to reduced capacity,
          increased sanitization costs and significantly lower revenue,
          Calgarian restaurants have been slowly suffocating under the weight of
          the economic downturn. A survey conducted by Statistics Canada in
          October 2020 found that 57 percent of businesses in the hospitality
          and food services industry would be unable to take on more debt.
          Nearly 30 percent of businesses in the sector reported that they would
          be operationally viable for only 6 more months until facing drastic
          cost-cutting measures.
        </p>
        <p className="motivation">
          Another issue to raise could be the state of mental health in Canada.
          Due to covid-19, the mental health of many Calgarians has
          deteriorated. Because of this pandemic, 24% of participants in a study
          reported fair or poor mental health. This is a massive jump from the
          previous 2018 survey where 8% of Canadians reported fair or poor
          mental health. Most participants experienced at least one symptom of
          anxiety in the two weeks prior to completing the survey.
        </p>
        <p className="motivation">
          BenchBae puts an innovative twist on the standard date night process
          while keeping mental health in mind. Our application lets our users
          find the closest bench west-facing to watch the sunset with their
          partner. This spontaneous and intimate experience is elevated with a
          hearty meal from a nice nearby restaurant as recommended by our app.
          The result is an experience that not only stimulates the local economy
          by supporting Calgary restaurants, but makes it easy to enjoy the
          company of your loved ones under the picturesque backdrop of the sun
          setting over the Rocky Mountains. For those early birds who love
          grabbing a bite at one of Calgary’s numerous breakfast joints, the
          application can also identify east-facing benches to add a much needed
          dose of sunshine into your morning routine. You can sit back, take a
          nice sip of your morning coffee, and watch the sun peak over the
          horizon.
        </p>
        <p className="motivation">
          In summary, our application aims to address several key issues in the
          areas of economic downturn, mental health, and social connection. Our
          application not only promotes spending within our local economy, it
          also encourages safe social connection, and inspires users to enjoy
          the little things in life.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
