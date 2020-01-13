import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Config from './config';
import './App.css';
import {MainPage} from './app/MainPage'


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
            <MainPage title={Config.message} />
          </Route>
        </Switch>
      </Router>
  )
}

export default App;
