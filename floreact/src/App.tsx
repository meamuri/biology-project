import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import logo from './logo.svg';
import Config from './config';
import './App.css';


export interface MainProps {
  title?: string,
}

const Index: React.FC<MainProps> = (props) => {
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {Config.message}
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  )
}

const App: React.FC = () => {
  return (
      <Router>
        <Switch>
          <Route path="/flora">
            {/*<Table/>*/}
          </Route>
          <Route path="/genus">
            {/*<Genus name="meeh" species={species}/>*/}
          </Route>
          <Route path="/">
            <Index title={Config.message} />
          </Route>
        </Switch>
      </Router>
  )
}

export default App;
