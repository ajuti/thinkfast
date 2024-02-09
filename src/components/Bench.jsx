import { Stack } from "@mui/material"
import { useSelector } from "react-redux"
import Unit from "./Unit"

const Bench = (props) => {
  const bench = useSelector(state => state.units).filter(unit => unit.pos === "BENCH")
  return (
    <Stack direction="row" spacing={2} sx={{marginBottom: "10px"}}>
      {bench.map(unit => 
        <Unit key={unit.id} id={unit.id} />   
      )}
    </Stack>
  )
}

export default Bench