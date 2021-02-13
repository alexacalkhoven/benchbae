import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return <div className="app-container">
    <Router>
      <Switch>
        <Route path="/" />
      </Switch>
    </Router>
  </div>;
};

export default App;
