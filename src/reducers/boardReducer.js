import { createSlice } from "@reduxjs/toolkit";
import pool from "../../pool.json"

// initialState: array with 9 "empty" ids

const boardSlice = createSlice({
  name: "board",
  initialState: pool.board,
  reducers: {
    swapSlotsRdcr(state, action) {
      const { unit, start, dest, swap } = action.payload
      const unitId = parseInt(unit)
      const swapId = parseInt(swap)
      return (
        state
          .map(slot => slot.pos !== dest ? slot : { ...slot, unit: unitId ? unitId : null })
          .map(slot => slot.pos !== start ? slot : { ...slot, unit: swapId ? swapId : null })
      )
    },
    buyToSlotRdcr(state, action) {
      const firstFree = (state.find(slot => (slot.pos.startsWith("E") && slot.unit === null))).pos
      return state.map(slot => slot.pos !== firstFree ? slot : { unit: action.payload, pos: firstFree })
    },
    sellToPoolRdcr(state, action) {
      const position = state.find(slot => slot.unit === action.payload).pos
      return state.map(slot => slot.pos !== position ? slot : { ...slot, unit: null })
    },
    removeIdRdcr(state, action) {
      return state.map(slot => !action.payload.includes(slot.unit) ? slot : { ...slot, unit: null })
    }
  }
})

export const buyToBenchSlot = (unitId) => {
  return async(dispatch) => {
    dispatch(buyToSlotRdcr(unitId))
  }
}

export const swapSlots = (unit, start, dest) => {
  return async(dispatch, getState) => {
    const swap = await getState().board.find(unit => unit.pos === dest).unit
    // console.log("from swapSlots", swap)
    dispatch(swapSlotsRdcr({ unit, start, dest, swap }))
  }
}

export const sellToPool = (unitId) => {
  return async(dispatch) => {
    dispatch(sellToPoolRdcr(unitId))
  }
}

// used to remove old units when combining, note: unitsIds is plural, as it is always an array
export const removeId = (unitIds) => {
  return async(dispatch) => {
    dispatch(removeIdRdcr(unitIds))
  }
}

export default boardSlice.reducer
export const { swapSlotsRdcr, buyToSlotRdcr, sellToPoolRdcr, removeIdRdcr } = boardSlice.actions