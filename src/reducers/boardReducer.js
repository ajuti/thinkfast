import { createSlice } from "@reduxjs/toolkit";

// initialState: array with 9 "empty" ids

const boardSlice = createSlice({
  name: "board",
  initialState: [
    { unit: 3, pos: "E1" },
    { unit: 5, pos: "E2" },
    { unit: null, pos: "E3" },
    { unit: 62, pos: "E4" },
    { unit: null, pos: "E5" },
    { unit: 20, pos: "E6" },
    { unit: 44, pos: "E7" },
    { unit: null, pos: "E8" },
    { unit: null, pos: "E9" },
  ],
  reducers: {
    swapSlotsRdcr(state, action) {
      const { unitId, start, dest } = action.payload
      const unitToSwapId = state.find(slot => slot.pos === dest).unit
      return (
        state
          .map(slot => slot.pos !== dest ? slot : { ...slot, unit: unitId })
          .map(slot => slot.pos !== start ? slot : { ...slot, unit: unitToSwapId })
      )
    },
    buyToSlotRdcr(state, action) {
      const firstFree = (state.find(slot => (slot.pos.startsWith("E") && slot.unit === null))).pos
      return state.map(slot => slot.pos !== firstFree ? slot : { unit: action.payload, pos: firstFree })
    },
    sellToPoolRdcr(state, action) {
      const position = state.find(slot => slot.unit === action.payload).pos
      return state.map(slot => slot.pos !== position ? slot : { ...slot, unit: null })
    }
  }
})

export const buyToBenchSlot = (unitId) => {
  return async(dispatch) => {
    dispatch(buyToBenchSlot(unitId))
  }
}

export const swapSlots = (unit, start, dest) => {
  return async(dispatch) => {
    dispatch(swapSlotsRdcr(unit, start, dest))
  }
}

export const sellToPool = (unitId) => {
  return async(dispatch) => {
    dispatch(sellToPool(unitId))
  }
}

export default boardSlice.reducer
export const { swapSlotsRdcr, buyToSlotRdcr, sellToPoolRdcr } = boardSlice.actions