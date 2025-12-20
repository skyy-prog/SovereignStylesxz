import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'
import { BrowserRouter ,  } from 'react-router-dom'
import Shopcontextprovider from './context/shopcontext.jsx';
import Functionfavcontext from './context/Favcontext.jsx'
// import SmoothScroll from './components/smooothing.jsx'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Shopcontextprovider>
    <Functionfavcontext>
    <App />
    </Functionfavcontext>
        {/* <SmoothScroll> */}
        {/* </SmoothScroll> */}
  </Shopcontextprovider>
  </BrowserRouter>,
)
