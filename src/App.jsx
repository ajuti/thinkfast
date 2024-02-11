import Homepage from './components/Homepage'
import { Routes, Route } from 'react-router-dom'
import Game from './components/Game'
import { Box } from '@mui/material'

const App = () => {

  return (
    <Box sx={{display: "flex", justifyContent: "center"}}>
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/play" element={<Game />} />
      </Routes>
    </Box>
  )
}

export default App
