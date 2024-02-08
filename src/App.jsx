import Homepage from './components/Homepage'
import { Routes, Route } from 'react-router-dom'
import Game from './components/Game'

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/play" element={<Game />} />
    </Routes>
  )
}

export default App
