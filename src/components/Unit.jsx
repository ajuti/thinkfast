import { Box } from "@mui/material"
import { buyUnit, createUnit, sellUnit } from "../reducers/unitReducer"
import { useDispatch, useSelector } from "react-redux"

const Unit = ({ id }) => {
  const baseUrl = "/src/assets"
  const dispatch = useDispatch()
  const units = useSelector(state => state.units)
  const bench = units.filter(unit => unit.pos === "BENCH")
  const { name, pos, star } = units.find(unit => unit.id === id)

  let style = { 
    width: '100%', 
    height: '100%', 
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }

  if (["BOARD", "BENCH"].includes(pos)) {
    style = { ...style, width: '100%', height: "100%" }
  }

  if (["POOL"].includes(pos)) {
    style = { ...style, width: '100%', height: '100%' }
  }

  const handleClick = () => {
    switch (pos) {
      case "SHOP":
        const newUnit = { name, id, pos: "BENCH", star: 1 }
        dispatch(buyUnit(newUnit, units, bench))
        break

      case "BOARD": 
      case "BENCH":
        //dispatch(sellUnit({ name, id, pos, star }))
        //dispatch(createUnit(name, star))
        //console.log("moving")
        break
    }
  }

  return (
    <Box sx={style}>
      <div className="unit">
        <img src={`${baseUrl}/${name}.webp`} 
          alt={name} 
          onClick={handleClick} 
          style={{ width: "100%", height: "100%"}}   
        /> 
        {star === 2 && <img src={`${baseUrl}/silver.webp`}
        style={{ position: "absolute", top: "-9%", left: "0", width: "40%", height: "40%" }} />}
        {star === 3 && <img src={`${baseUrl}/gold.webp`}
        style={{ position: "absolute", top: "-9%", left: "0", width: "40%", height: "40%" }} />}
      </div>
    </Box>
  )
}

export default Unit