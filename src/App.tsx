import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Header from './layouts/Header'
import Timeline from './pages/Timeline'
import Projects from './pages/Projects'
import Ideas from './pages/Ideas'
import './App.css'

function App() {
  return (
    <Router>
      <Header name="aha" />

      {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
      */}
      <Switch>
        <Route exact path="/timeline">
          <Timeline />
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>
        <Route path="/ideas">
          <Ideas />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
