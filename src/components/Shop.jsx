import { Button, ImageList } from "@mui/material"
import { useEffect } from "react"
import Unit from "./Unit"
import { refreshShop } from "../reducers/unitReducer"
import { useDispatch, useSelector } from "react-redux"

const Shop = () => {
  console.log(useSelector(state => state.units))
  const pool = useSelector(state => state.units).filter(unit => unit.pos === "POOL")
  const shop = useSelector(state => state.units).filter(unit => unit.pos === "SHOP")
  const dispatch = useDispatch()

  const generateShop = () => {
    const moveIn = pool.sort(() => Math.random() - Math.random()).slice(0, 5).map(unit => unit.id)
    const moveOut = shop.map(unit => unit.id)
    
    return {
      in: moveIn,
      out: moveOut,
    }
  }

  const handleRefresh = () => {
    dispatch(refreshShop(generateShop()))
  }

  useEffect(() => {
    handleRefresh()
  }, [])

  return (
    <>
      <Button variant="contained" sx={{ width: "100px", height: "100px", position: "absolute", bottom: "5%", left: "5%"}} onClick={handleRefresh}>Refresh</Button>
      <ImageList cols={5} sx={{ 
        width: "766px", 
        height: "144px", 
        alignSelf: "end",
        backgroundColor: "darkgrey",
        padding: "10px",
        position: "absolute",
        }}>
        {shop.map((emote) => (
          <Unit key={emote.id} id={emote.id} />
        ))}
      </ImageList>
    </>
  )
}

export default Shop