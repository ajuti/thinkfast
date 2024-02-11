import { configureStore } from "@reduxjs/toolkit";
import unitReducer from "./reducers/unitReducer";
import shopReducer from "./reducers/shopReducer";

const store = configureStore({
  reducer: {
    units: unitReducer,
    shop: shopReducer,
  }
})

export default store