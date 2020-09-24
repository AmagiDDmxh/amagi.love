import React from 'react'
import { Switch, Route, BrowserRouter as Router, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Header from './layouts/Header'
import Timeline from './pages/Timeline'
import Projects from './pages/Projects'
import Ideas from './pages/Ideas'
import About from './pages/About'
import './App.css'

function App() {
  
  return (
    <Router>
      <Header name="AmagiDDmxh" />
      {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
      */}
      <Page />
    </Router>
  );
}

export default App;


function Page() {
  const location = useLocation()
  console.log('location :>> ', location)
  
  return (
    <TransitionGroup>
      <CSSTransition
        key={location?.key}
        classNames="fade"
        timeout={100}>
        {/* <Route exact path="/timeline">
          <Timeline />
        </Route> */}
        <Switch location={location}>
          <Route exact path="/timeline">
            <Timeline />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/ideas">
            <Ideas />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}