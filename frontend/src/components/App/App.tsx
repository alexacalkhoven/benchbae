import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import ResultsPage from '../ResultsPage/ResultsPage';
import { BenchBaeProvider } from '../../contexts/BenchBaeContext';
import './App.css';

const App = () => {
  return (
    <BenchBaeProvider>
      <div className="app-container">
        <Router>
          <Switch>
            <Route path="/" component={LandingPage} exact />
            <Route path="/results" component={ResultsPage} exact />
          </Switch>
        </Router>
      </div>
    </BenchBaeProvider>
  );
};

export default App;
