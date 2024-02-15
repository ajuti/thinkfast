import { Box } from "@mui/material"
import Unit from "./Unit"

const BoardSlot = ({ slot }) => {
  return (
    <Box className="boardslot" sx={{ 
      border: "solid black",
      width: "100%", 
      height: "100%", 
      boxSizing: "content-box",
      display: "flex"
    }}>
      {slot && <Unit key={slot.unit} id={slot.unit} />} 
      {!slot && <div></div>}
    </Box>
  )  
}

export default BoardSlot