import { createStore, combineReducers, applyMiddleware } from "redux"
import * as reducers from "./slices/index"
import thunk from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"
import {} from "./slices"

const reducer = combineReducers(reducers)
export const store = configureStore({
    reducer: {
        departments: 
    }
})
