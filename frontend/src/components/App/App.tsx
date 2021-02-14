import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import LandingPage from '../LandingPage/LandingPage';

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
