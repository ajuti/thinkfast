import { Stack } from "@mui/material"
import { useSelector } from "react-redux"
import Unit from "./Unit"



const Bench = (props) => {
  const bench = useSelector(state => state.units).filter(unit => unit.pos === "BENCH")
  return (
    <Stack direction="row" spacing={2} sx={{
      marginBottom: "10px", 
      border: "solid black",
      position: "absolute",
      left: "15%",
      right: "15%",
      bottom: "1%",
      display: "flex",
    }}>
      {bench.map(unit => 
        <Unit key={unit.id} id={unit.id} />   
      )}
    </Stack>
  )
}

export default Bench