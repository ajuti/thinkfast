import { Paper } from "@mui/material"
import { useSelector } from "react-redux"
import Bench from "./Bench"

const Board = (props) => {
  const units = useSelector(state => state.units).filter(unit => unit.pos === "BOARD" || unit.pos === "COMBINED")

  return (
    <Paper elevation={3} sx={{
      width: "95%",
      height: "78%",
      backgroundColor: "green",
      position: "absolute",
      margin: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "end",
    }}>
      <Bench />
    </Paper>
  )
}

export default Board