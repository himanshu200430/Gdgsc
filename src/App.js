import React from 'react'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import { BrowserRouter , Routes, Route} from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/team" element={<LandingPage />} />
          <Route path="/about" element={<LandingPage />} />
          {/* Add other routes here */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
