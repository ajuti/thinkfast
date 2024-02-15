import { Box } from "@mui/material"
import Unit from "./Unit"

const ShopSlot = ({ slot }) => {
  return (
    <Box sx={{ 
      border: "solid black", 
      width: "20%", 
      height: "100%", 
      backgroundColor: "transparent",
      boxSizing: "border-box"
    }}>
      {slot && <Unit key={slot.id} id={slot.id} />} 
      {!slot && <div>sold</div>}
    </Box>
  )
}

export default ShopSlot