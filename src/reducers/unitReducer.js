import { createSlice } from "@reduxjs/toolkit";
import { setShop } from "./shopReducer";
import { buySlot } from "../reducers/shopReducer"
import { buyToBenchSlot, removeId } from "./boardReducer";

/**
 * units are objects in the form of {
 *  name: emoteName,
 *  id: id, *  pos: Position (shop | pool | board | combined)
 *  cost: unitCost,
 *  star: starLevel 
 * }
 */

const unitSlice = createSlice({
  name: "units",
  initialState: [],
  reducers: {
    buyUnitRdcr(state, action) {
      const newUnit = { ...action.payload }
      if (newUnit.remove) {
        return state.filter(u => !newUnit.remove.includes(u.id)).concat([newUnit])
      }
      return state.map(unit => unit.id !== action.payload.id ? unit : {...action.payload })
    },
    sellUnitRdcr(state, action) {
      return state.filter(unit => unit.id !== action.payload)
    },
    refreshShopRdcr(state, action) {
      return state
        .map(unit => !action.payload.in.includes(unit.id) ? unit : { ...unit, pos: "SHOP" })
        .map(unit => !action.payload.out.includes(unit.id) ? unit : { ...unit, pos: "POOL"})
    },
    initGameRdcr(state, action) { /** Also used to create units when 2 or 3 stars are sold */
      return state.concat([...action.payload])
    },
  }
})

export let maxId = 1

export const incId = () => {
  maxId++
}

export const buyUnit = (unit, allUnits, bench) => {
  return async(dispatch) => {
    const sameUnits = allUnits.filter(u => u.name === unit.name && u.star === 1 && (u.pos === "BOARD" || u.pos === "BENCH")) 
    if (bench.length === 9 && sameUnits.length !== 2) {
      console.log("Bench is full")
      return
    }
    dispatch(buySlot(unit))
    const newUnit = { ...unit }
    if (sameUnits.length === 2) {
      const twoStars = allUnits.filter(u => u.name === unit.name && u.star === 2 && (u.pos === "BOARD" || u.pos === "BENCH"))
      incId()
      newUnit.star = 2
      newUnit.id = maxId
      newUnit.remove = [...sameUnits.map(x => x.id), unit.id]
      if (twoStars.length === 2) {
        newUnit.star = 3
        newUnit.remove = newUnit.remove.concat(...[twoStars.map(x => x.id)])
      }
      // console.log(newUnit.remove)
    }
    if (newUnit.remove) {
      dispatch(removeId(newUnit.remove))
    }
    dispatch(buyToBenchSlot(newUnit.id))
    dispatch(buyUnitRdcr({ ...newUnit })) 
    // console.log("bought: ", newUnit)
  }
}

export const sellUnit = (unitId) => {
  return async(dispatch) => {
    // console.log("sold: ", unit)
    dispatch(sellUnitRdcr(unitId)) 
  }
}

export const refreshShop = (shop) => {
  return async(dispatch) => {
    // console.log("refreshed shop", shop)
    dispatch(setShop(shop.state))
    dispatch(refreshShopRdcr(shop))
  }
}

export const initalizeGame = (array) => {
  return async(dispatch) => {
    // console.log("game initialized")
    dispatch(initGameRdcr(array))
  }
}

export const createUnit = (name, star, cost) => {
  return async(dispatch) => {
    // console.log("created units")
    let amt = 1 
    if (star === 2) { amt = 3}
    if (star === 3) { amt = 9}

    const arr = []
    for (let i=0; i < amt; i++) {
      incId()
      arr.push({ name, id: maxId, pos: "POOL", star: 1 })
    }
    dispatch(initGameRdcr(arr))
  }
}

export default unitSlice.reducer
export const { buyUnitRdcr, sellUnitRdcr, refreshShopRdcr, initGameRdcr } = unitSlice.actions