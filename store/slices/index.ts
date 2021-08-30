import { combineReducers } from "redux"
import { departmentReducer } from "./departments"

export default combineReducers({ department: departmentReducer })
