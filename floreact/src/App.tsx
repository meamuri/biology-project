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
          <Route path="/flora">
            <Table/>
          </Route>
          <Route path="/index">
            <FloraComponent/>
          </Route>
          <Route path="/">
            <MainPage title={Config.message} />
          </Route>
        </Switch>
      </Router>
  )
}

export default App;
