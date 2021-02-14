import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import LandingPage from '../LandingPage/LandingPage';
import ResultsPage from '../ResultsPage/ResultsPage';

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/results" component={ResultsPage} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
