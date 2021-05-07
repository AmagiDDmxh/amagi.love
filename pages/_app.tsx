import { AppProps } from 'next/dist/next-server/lib/router/router'
import useSWR from 'swr'

import Header from '../layouts/Header'
import Quote from '../components/Quote'
import '../styles/index.css'

const fetcher = (...args: any[]) => fetch(args[0], ...args.slice(1)).then((res) => res.json())

const App = ({ Component, pageProps }: AppProps) => {
  const { data: quote } = useSWR('/api/quote', fetcher)

  return (
    <div>
      <Header name="AmagiDDmxh" />
      {/* @ts-ignore */}
      <Quote {...quote} />
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
