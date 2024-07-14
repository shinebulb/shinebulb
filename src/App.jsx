import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Play from './Play';
import Settings from './Settings';
import About from './About';
import Support from './Support';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}/>
          <Route path="/" element={<Home />}/>
          <Route path="/play" element={<Play />}/>
          <Route path="/settings" element={<Settings />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/support" element={<Support />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
