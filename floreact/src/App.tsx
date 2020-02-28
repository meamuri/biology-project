import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Config from './config'
import './App.css'
import { MainPage } from './components/MainPage'
import { Table } from './components/Table'
import Classification from './components/Classification'


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
            <Classification />
          </Route>
        </Switch>
      </Router>
  )
}

export default App
