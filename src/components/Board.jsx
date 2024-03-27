import { Paper, Grid, Box } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import interact from "interactjs"
import BoardSlot from "./BoardSlot"
import { useState } from "react"
import { swapSlots, buyToBenchSlot, sellToPool } from "../reducers/boardReducer"

const Board = (props) => {
  const bench = useSelector(state => state.board).filter(unit => unit.pos.startsWith("E"))
  const board = useSelector(state => state.board).filter(unit => !unit.pos.startsWith("E"))
  const dispatch = useDispatch()
  const [testState, setTest] = useState(true)
  console.log("render", bench)
  
  let stateFlag = true
  let origin;

  let counter = 1

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
          origin = { 
            x: event.target.getAttribute("data-x") || 0,
            y: event.target.getAttribute("data-y") || 0,
            slot: event.target.parentElement.parentElement.classList.item(1),
          }
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
            draggable.style.transform = `translate(${origin.x}px, ${origin.y}px)`
            draggable.setAttribute("data-x", origin.x)
            draggable.setAttribute("data-y", origin.y)
          }
          // console.log("yey")
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
        // console.log("dropping", event.relatedTarget)
      },
      ondragenter: function (event) {
        var draggable = event.relatedTarget
        var dropzone = event.target
        dropzone.classList.add("drop-active")
        draggable.classList.add("can-drop")
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
        if (!stateFlag) {
          // console.log("stateFlag", testState)
          return;
        }
        console.log("executing ondrop...")
        stateFlag = false
        var draggable = event.relatedTarget
        var dropzone = event.target

        var originX = parseFloat(draggable.getAttribute("data-x"))
        var originY = parseFloat(draggable.getAttribute("data-y"))
        var dx = slot.x - draggable.getBoundingClientRect().x + 3
        var dy = slot.y - draggable.getBoundingClientRect().y + 3 
        draggable.style.transform = `translate(${dx + originX}px, ${dy + originY}px)`
        
        draggable.setAttribute("data-x", parseFloat(draggable.getAttribute("data-x")) + dx)
        draggable.setAttribute("data-y", parseFloat(draggable.getAttribute("data-y")) + dy)

        const unitId = draggable.classList.item(1)
        const start = origin.slot
        const dest = dropzone.classList.item(1)

        /* setTimeout(() => {
          console.log("dropped", draggable)
        }, counter * 1000) */
        console.log("dropped")
        
        dispatch(swapSlots(unitId, start, dest))
        // setTest(!testState)
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
        <Box sx={{ flexGrow: 1, width: "100%", height: "100%", position: "relative" }}>
          <Grid container spacing={1} sx={{ width: "100%", height: "100%", margin: 0, position: "absolute", display: "flex", justifyContent: "center" }}>
            {board.map((unit) => {
              return (
                <Grid key={unit.pos} className="gridslot" item md={1.5} sx={(unit.pos === "B0" || unit.pos === "D0") ? { marginLeft: 10, height: "18%" } : { height: "18%" }}>
                  <BoardSlot slot={unit} />
                </Grid>
              )
            })}
            {bench.map((unit) => {
              return (
                <Grid key={unit.pos} className="gridslot benchslot" item md={1.25} sx={{ height: "15%", marginTop: 4, marginBottom: 2 }}>
                  <BoardSlot slot={unit} />
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