import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Config from './config';
import './App.css';
import { MainPage } from './components/MainPage'
import { Table } from './components/Table'
import { FloraComponent } from './components/classification/FloraComponent';


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
            <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                  <Link className="navbar-brand" to="/">Flora</Link>
                </div>
              </nav>
              <div className="container">
                <FloraComponent/>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
  )
};

export default App;
