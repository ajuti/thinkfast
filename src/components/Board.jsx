import { Paper } from "@mui/material"
import { useSelector } from "react-redux"
import Bench from "./Bench"
import interact from "interactjs"
import Unit from "./Unit"

const Board = (props) => {
  const units = useSelector(state => state.units).filter(unit => unit.pos === "POOL")

  const unit = interact(".unit")
  unit
    .draggable({
      inertia: false,
      modifiers: [
        interact.modifiers.restrict({
          restriction: "#gameboard",
          endOnly: true
        })
      ],
      autoScroll: true,
      listeners: {
        start (event) {
          // console.log(event.target.getAttribute("data-x"), event.target.getAttribute("data-x"))
        },
        move (event) {
          event.preventDefault()
          var x = (parseFloat(event.target.getAttribute('data-x')) || 0) + event.dx
          var y = (parseFloat(event.target.getAttribute('data-y')) || 0) + event.dy

          event.target.style.transform =
            `translate(${x}px, ${y}px)`

          event.target.setAttribute('data-x', x)
          event.target.setAttribute('data-y', y)
        },
        end (event) {
          // console.log(event.target.getAttribute("data-x"), event.target.getAttribute("data-x"))
        }
      }
    })

  return (
    <Paper elevation={3} sx={{
      width: "95%",
      height: "78%",
      backgroundColor: "green",
      position: "absolute",
      margin: "10px",
    }}>
      <div id="gameboard">
        <Bench />
      </div>
    </Paper>
  )
}

export default Board