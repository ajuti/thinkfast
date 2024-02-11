import Shop from "./Shop"
import Board from "./Board"
import { Box } from "@mui/material"
import { useDispatch } from 'react-redux'
import pool from "../../pool.json"
import { incId, initalizeGame, maxId  } from '../reducers/unitReducer'

const Game = (props) => {
  const dispatch = useDispatch()
  const units = pool.units

  for (let i=0; i < units.length; i++) {
    const arr = []
    for (let j=0; j < units[i].amount; j++) {
      const obj = { ...units[i], id: maxId }
      delete obj.amount
      arr.push(obj)
      incId()
    }
    dispatch(initalizeGame(arr))
  }
  return (
    <Box sx={{
      height: "90vh",
      width: "75vw",
      backgroundColor: "#99c1f1",
      display: "flex",
      justifyContent: "center",
      position: "relative",
    }}>
      <Board />
      <Shop />
    </Box>
  )
}

export default Game