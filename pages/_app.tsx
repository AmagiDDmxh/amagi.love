import React from 'react'

import Header from '../layouts/Header'
import '../styles/index.css'
import '@dracula/dracula-ui/styles/dracula-ui.css'

const App = ({ Component, pageProps }) => {
  return (
    <div>
      <Header name="AmagiDDmxh" />
      <Component {...pageProps} />
    </div>
  )
}

export default App

// function Page() {
//   return (
//     <TransitionGroup>
//       <CSSTransition key={location?.key} classNames="fade" timeout={100}>
//         {/* <Route exact path="/timeline">
//           <Timeline />
//         </Route> */}
//         <Switch location={location}>
//           <Route exact path="/timeline">
//             <Timeline />
//           </Route>
//           <Route path="/projects">
//             <Projects />
//           </Route>
//           <Route path="/ideas">
//             <Ideas />
//           </Route>
//           <Route path="/about">
//             <About />
//           </Route>
//         </Switch>
//       </CSSTransition>
//     </TransitionGroup>
//   );
// }
