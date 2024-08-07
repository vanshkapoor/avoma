import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from "./routes.js";
import ScrollToTop from "./components/ScrollToTop.js";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {
  
  const queryClient = new QueryClient()

  return (
    <>
      <Router>
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
      <Routes>
        {
          Object.values(routes).map(route => <Route exact path={route.route} Component={route.component} />)
        }
      </Routes>
      </QueryClientProvider>
    </Router>    
    </>
  )
}

export default App
