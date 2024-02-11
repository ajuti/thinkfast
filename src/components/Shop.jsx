import { Button, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import ShopSlot from "./ShopSlot"
import { refreshShop } from "../reducers/unitReducer"
import { useDispatch, useSelector } from "react-redux"

const Shop = () => {
  const pool = useSelector(state => state.units).filter(unit => unit.pos === "POOL")
  const shop = useSelector(state => state.shop)
  const dispatch = useDispatch()

  const generateShop = () => {
    const moveIn = pool.sort(() => Math.random() - Math.random()).slice(0, 5)
    const moveOut = shop.filter(unit => unit).map(unit => unit.id)
    
    return {
      in: moveIn.map(unit => unit.id),
      out: moveOut,
      state: moveIn.map(unit => ({ ...unit, pos: "SHOP", bought: false })),
    }
  }

  const handleRefresh = () => {
    dispatch(refreshShop(generateShop()))
  }

  useEffect(() => {
    handleRefresh()
  }, [])

  // console.log(shop, pool)

  return (
    <>
      <Button variant="contained" sx={{ width: "8%", height: "10%", position: "absolute", bottom: "5%", left: "5%"}} onClick={handleRefresh}>Refresh</Button>
      <Stack direction="row" spacing={0} cols={5} sx={{ 
        width: "60%", 
        height: "18%", 
        alignSelf: "end",
        backgroundColor: "darkgrey",
        padding: "0",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: "1%",
        }}>
        {shop.length === 5 &&
        <>
          <ShopSlot slot={shop[0]}/>
          <ShopSlot slot={shop[1]}/>
          <ShopSlot slot={shop[2]}/>
          <ShopSlot slot={shop[3]}/>
          <ShopSlot slot={shop[4]}/>
        </>
        }
      </Stack>
    </>
  )
}
/**
 * 
        {shop.map((emote) => (
          <Unit key={emote.id} id={emote.id} />
        ))}
 */
export default Shop