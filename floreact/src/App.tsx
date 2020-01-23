import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Config from './config';
import './App.css';
import {MainPage} from './app/MainPage'
import {Table} from './app/Table'
import {FloraComponent} from './app/classification/FloraComponent';


const App: React.FC = () => {
  return (
      <Router>
        <Switch>
          <Route path="/table">
            <Table/>
          </Route>
          <Route path="/easter-egg">
            <MainPage title={Config.message} />
          </Route>
          <Route path="/">
            <FloraComponent name="Flora"/>
          </Route>
        </Switch>
      </Router>
  )
};

export default App;
