import { Paper, Grid, Box } from "@mui/material"
import { useSelector } from "react-redux"
import Bench from "./Bench"
import interact from "interactjs"
import BoardSlot from "./BoardSlot"

const Board = (props) => {
  const units = useSelector(state => state.board)

  let origin;

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
          origin = { x: event.target.getAttribute("data-x") || 0, y: event.target.getAttribute("data-y") || 0 }
          console.log(origin)
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
          var draggable = event.target
          if (!draggable.classList.contains("can-drop")) {
            draggable.style.transform = "translate(0, 0)"
            draggable.setAttribute("data-x", origin.x)
            draggable.setAttribute("data-y", origin.y)
          }
        }
      }
    })


  let slot;

  const gridslot = interact(".boardslot")
  gridslot
    .dropzone({
      accept: ".unit",
      overlap: 0.65,

      ondropactivate: function (event) {
        origin = { x: event.target.getAttribute("data-x"), y: event.target.getAttribute("data-y") }
      },
      ondragenter: function (event) {
        var draggable = event.relatedTarget
        var dropzone = event.target
        dropzone.classList.add("drop-active")
        draggable.classList.add("can-drop")
        // console.log(dropzone.getBoundingClientRect().x, dropzone.getBoundingClientRect().y)
        // console.log(draggable.getBoundingClientRect().x, draggable.getBoundingClientRect().y)
        slot = { x: dropzone.getBoundingClientRect().x, y: dropzone.getBoundingClientRect().y }
      },
      ondragleave: function (event) {
        var draggable = event.relatedTarget
        var dropzone = event.target
        dropzone.classList.remove("drop-active")
        draggable.classList.remove("can-drop")
        slot = null
      },
      ondrop: function (event) {
        var draggable = event.relatedTarget
        var dropzone = event.target
        if (draggable.classList.contains("can-drop")) {
          var originX = parseFloat(draggable.getAttribute("data-x"))
          var originY = parseFloat(draggable.getAttribute("data-y"))
          var dx = slot.x - draggable.getBoundingClientRect().x // how much to correct x-wise
          var dy = slot.y - draggable.getBoundingClientRect().y // how much to correct y-wise
          draggable.style.transform = `translate(${dx + originX}px, ${dy + originY}px)`
          
          draggable.setAttribute("data-x", parseFloat(draggable.getAttribute("data-x")) + dx)
          draggable.setAttribute("data-y", parseFloat(draggable.getAttribute("data-y")) + dy)
        } 
        dropzone.classList.remove("drop-active")
      },
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
        <Box sx={{ flexGrow: 1, width: "100%", height: "75%", position: "relative" }}>
          <Grid container spacing={1} sx={{ width: "100%", height: "100%", margin: 0, position: "absolute", display: "flex", justifyContent: "center" }}>
            {[...Array(28).keys()].map((val, idx) => {
              return (
                <Grid key={idx} className="gridslot" item md={1.5} sx={(idx === 7 || idx === 21) ? { marginLeft: 10, maxHeight: "25%" } : { maxHeight: "25%" }}>
                  <BoardSlot slot={idx % 5 === 0 ? units[0] : null}/>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </div>
    </Paper>
  )
}
/**
 * 
            <Grid className="gridslot" item md={1.5} sx={{ padding: 0, maxHeight: "25%" }}>
              {units.length !== 0 && <BoardSlot slot={units[0]} />}
            </Grid>
 */

export default Board