import { ImageListItem } from "@mui/material"
import { buyUnit, createUnit, sellUnit } from "../reducers/unitReducer"
import { useDispatch, useSelector } from "react-redux"

const Unit = ({ id }) => {
  const baseUrl = "/src/assets"
  const dispatch = useDispatch()
  const units = useSelector(state => state.units)
  const { name, pos, star } = units.find(unit => unit.id === id)

  let style = { border: 'solid black', widht: '140px', height: '140px', position: "relative" }

  if (["BOARD", "BENCH"].includes(pos)) {
    style = { ...style, width: '64px', height: '64px' }
  }

  const handleClick = () => {
    switch (pos) {
      case "SHOP":
        const newUnit = { name, id, pos: "BENCH", star: 1 }
        dispatch(buyUnit(newUnit, units))
        break

      case "BOARD": 
      case "BENCH":
        dispatch(sellUnit({ name, id, pos, star }))
        dispatch(createUnit(name, star))
        break
    }
  }

  return (
    <ImageListItem sx={style}>
      <img src={`${baseUrl}/${name}.webp`} 
        alt={name} 
        onClick={handleClick} /> 
      {star === 2 && <img src={`${baseUrl}/silver.webp`}
       style={{ position: "absolute", top: "-9%", left: "0", width: "40%", height: "40%" }} />}
      {star === 3 && <img src={`${baseUrl}/gold.webp`}
       style={{ position: "absolute", top: "-9%", left: "0", width: "40%", height: "40%" }} />}
    </ImageListItem>
  )
}

export default Unit