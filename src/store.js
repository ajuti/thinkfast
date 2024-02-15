import { configureStore } from "@reduxjs/toolkit";
import unitReducer from "./reducers/unitReducer";
import shopReducer from "./reducers/shopReducer";
import boardReducer from "./reducers/boardReducer";

const store = configureStore({
  reducer: {
    units: unitReducer,
    shop: shopReducer,
    board: boardReducer,
  }
})

export default store