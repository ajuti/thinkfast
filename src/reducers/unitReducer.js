import { createSlice } from "@reduxjs/toolkit";

/**
 * units are objects in the form of {
 *  name: emoteName,
 *  id: id,
 *  pos: Position (shop | pool | board | combined)
 *  cost: unitCost,
 *  star: starLevel 
 * }
 */

const unitSlice = createSlice({
  name: "units",
  initialState: [],
  reducers: {
    buyUnitRdcr(state, action) {
      console.log(action.payload)
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
    initShopRdcr(state, action) {
      return state.concat([...action.payload])
    }
  }
})

export let maxId = 0

export const incId = () => {
  maxId++
}

export const buyUnit = (unit, allUnits) => {
  return async(dispatch) => {
    const newUnit = { ...unit }
    const sameUnits = allUnits.filter(u => u.name === unit.name && u.star === 1 && u.pos === "BOARD") 
    if (sameUnits.length === 2) {
      incId()
      newUnit.pos = "COMBINED"
      newUnit.star = 2
      newUnit.id = maxId
      newUnit.remove = [...sameUnits.map(x => x.id), unit.id]
      // implement combine
    }
    dispatch(buyUnitRdcr({ ...newUnit })) 
    console.log("bought: ", newUnit)
  }
}

export const sellUnit = (unit) => {
  return async(dispatch) => {
    console.log("sold: ", unit)
    dispatch(sellUnitRdcr(unit)) 
  }
}

export const refreshShop = (shop) => {
  return async(dispatch) => {
    console.log("refreshed shop")
    dispatch(refreshShopRdcr(shop))
  }
}

export const initalizeShop = (array) => {
  return async(dispatch) => {
    console.log("shop initialized")
    dispatch(initShopRdcr(array))
  }
}

export default unitSlice.reducer
export const { buyUnitRdcr, sellUnitRdcr, refreshShopRdcr, initShopRdcr } = unitSlice.actions