import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import * as axios from "axios"
import { Dispatch } from "react"

const axiosClient = axios.default

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

const getAllDepartments = createAsyncThunk(
  "departments/getAll",
  async (_, thunkApi) => {
    const response = await axiosClient.get<IDepartment[]>("/departments")
    if (response.status === 200) {
      return response.data
    } else {
      return thunkApi.rejectWithValue(response.data)
    }
  }
)

const getDepartment = (id: string) =>
  createAsyncThunk("departments/get", async (_, thunkApi) => {
    const response = await axiosClient.get<IDepartment>(`/department/${id}`)
    if (response.status === 200) {
      return response.data
    } else {
      return thunkApi.rejectWithValue(response.data)
    }
  })

const postDepartment = (department: IDepartment) =>
  createAsyncThunk("departments/post", async (_, thunkApi) => {
    const response = await axiosClient.post(`/department`, department)
    if (response.status === 200) {
      return response.data
    } else {
      return thunkApi.rejectWithValue(response.data)
    }
  })

const putDepartment = (department: IDepartment) =>
  createAsyncThunk("departments/put", async (_, thunkApi) => {
    const response = await axiosClient.put(
      `/department/${department.departmentId}`
    )
    if (response.status === 200) {
      return response.data
    } else {
      return thunkApi.rejectWithValue(response.data)
    }
  })

const deleteDepartment = (department: IDepartment) =>
  createAsyncThunk("departments/delete", async (_, thunkApi) => {
    const response = await axiosClient.delete(
      `/department/${department.departmentId}`
    )
    if (response.status === 200) {
      return response.data
    } else {
      return thunkApi.rejectWithValue(response.data)
    }
  })

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    createDepartmentAction: (
      state,
      action: PayloadAction<ICreateDepartment>
    ) => {},

    getAllDepartmentsAction: (state) => {},

    getDepartmentAction: (state, action: PayloadAction<string>) => {},

    updateDepartmentAction: (state, action: PayloadAction<IDepartment>) => {},

    deleteDepartmentAction: (state, action: PayloadAction<string>) => {},
  },
})

export const {
  createDepartmentAction,
  updateDepartmentAction,
  deleteDepartmentAction,
} = departmentSlice.actions

export const createDepartmentAsync =
  (department: ICreateDepartment) =>
  (dispatch: Dispatch<PayloadAction<ICreateDepartment>>) => {
    dispatch(createDepartmentAction(department))
  }

export const departmentReducer = departmentSlice.reducer
