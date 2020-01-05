import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './Table';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import CONFIG from './config';

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/flora">
                <Table/>
            </Route>
            <Route path="/">
                {
                    main(CONFIG.defaultMessage)
                }
            </Route>
        </Switch>
    </Router>
  );
}

function main(greetingMessage) {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    {greetingMessage}
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Woof woof
                </a>
            </header>
        </div>
    )
}

export default App;
