import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Mesero from './views/mesero/Mesero'
import Cocinero from './views/cocinero/Cocinero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <h1>Smart Restaurant</h1>

      <Routes>
        <Route path="/mesero" element={<Mesero />} />
        <Route path="/cocinero" element={<Cocinero />} />
      </Routes>
    </Router>
  )
}

export default App
