import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: [],
  reducers: {
    setShopRdcr(state, action) {
      return action.payload
    },
    buySlotRdcr(state, action) {
      return state.map(unit => (unit && unit.id !== action.payload) ? unit : null)
    },
  }
})

export const buySlot = (unit) => {
  return async(dispatch) => {
    dispatch(buySlotRdcr(unit.id))
  }
}

export const setShop = (allUnits) => {
  return async(dispatch) => {
    dispatch(setShopRdcr(allUnits))
  }
}

export default shopSlice.reducer
export const { setShopRdcr, buySlotRdcr } = shopSlice.actions