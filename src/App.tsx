import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { routes } from "./routes.js";
import ScrollToTop from "./components/ScrollToTop.js";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {
  
  const queryClient = new QueryClient()

  const [domain, setDomain] = useState("")

  const createCookie = () => {
    document.cookie = `auth_token=usertoken; SameSite=None; Secure; path=/`;
  }
  
  const createDomainCookie = (url) => {
    console.log(url)
    document.cookie = `auth_token=usertoken; SameSite=None; Secure; path=/; Domain=${url}`;
  }


  return (
    <>
      <Router>
      <button onClick={createCookie}>Create a cookie</button>
      <br />
      <input type='text' onChange={e => setDomain(e.target.value)} placeholder='enter URL' />
      <br />
      <button onClick={createDomainCookie}>Create a domain cookie</button>
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
      <Routes>
        {
          Object.values(routes).map(route => <Route path={route.route} Component={route.component} />)
        }
      </Routes>
      </QueryClientProvider>
    </Router>    
    </>
  )
}

export default App
