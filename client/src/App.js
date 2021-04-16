import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/layout/Register';
import Login from './components/layout/Login';
import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <section className="container">
        <Route exact path="/" component={Landing} />
      </section>
    </Fragment>
  </Router>
);

export default App;
