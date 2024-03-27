import { Box } from "@mui/material"
import Unit from "./Unit"

const BoardSlot = ({ slot }) => {
  return (
    <Box className={`boardslot ${slot.pos}`} sx={{ 
      border: "solid black",
      width: "100%", 
      height: "100%", 
      boxSizing: "content-box",
      display: "flex"
    }}>
      {slot.unit && <Unit key={slot.unit} id={slot.unit} />} 
    </Box>
  )  
}

export default BoardSlot