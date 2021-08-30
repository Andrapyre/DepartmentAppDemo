import * as reducers from "./slices/index"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: reducers.default,
})
