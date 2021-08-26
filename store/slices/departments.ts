import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { Dispatch } from "react"

const initialState: IDepartment[] = []

export interface ICreateDepartment {
  departmentName: string
  contactName: string
  contactEmail: string
  contactPhone: string
}

export interface IDepartment {
  departmentId: string
  departmentName: string
  contactName: string
  contactEmail: string
  contactPhone: string
}

const fetchDepartments = createAsyncThunk(
  "departments/fetchAll",
  async() => {
    const response = await fetch("/departments")
    if (response.status === 200) {
      return (await response.json()) as IDepartment[]
    } else {
      return thunkApi.
    }
  }
)

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    createDepartment: (state, action: PayloadAction<ICreateDepartment>) => {},

    updateDepartment: (state, action: PayloadAction<IDepartment>) => {},

    deleteDepartment: (state, action: PayloadAction<string>) => {},
  },
  
  extraReducers: (builder) => {
    builder.addCase()
  }
})

export const { createDepartment, updateDepartment, deleteDepartment } =
  departmentSlice.actions

export const createDepartmentAsync =
  (department: ICreateDepartment) =>
  (dispatch: Dispatch<PayloadAction<ICreateDepartment>>) => {
    dispatch(createDepartment(department))
  }

export const updateDepartmentAsync = ()

export const departmentReducer = departmentSlice.reducer
