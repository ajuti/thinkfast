import Shop from "./Shop"
import Board from "./Board"
import { Container } from "@mui/material"
import { useDispatch } from 'react-redux'
import pool from "../../pool.json"
import { incId, initalizeShop, maxId  } from '../reducers/unitReducer'

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
    dispatch(initalizeShop(arr))
  }
  return (
    <Container sx={{
      height: "900px",
      backgroundColor: "#99c1f1",
      display: "flex",
      justifyContent: "center",
      position: "relative",
    }}>
      <Board />
      <Shop />
    </Container>
  )
}

export default Game