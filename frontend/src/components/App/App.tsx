import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import ResultsPage from '../ResultsPage/ResultsPage';
import { BenchBaeProvider } from '../../contexts/BenchBaeContext';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import './App.css';

const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#725A7A'
    }
  }
});

const App = () => {
  return (
    <BenchBaeProvider>
      <MuiThemeProvider theme={MuiTheme}>
        <div className="app-container">
          <Router>
            <Switch>
              <Route path="/" component={LandingPage} exact />
              <Route path="/results" component={ResultsPage} exact />
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    </BenchBaeProvider>
  );
};

export default App;
