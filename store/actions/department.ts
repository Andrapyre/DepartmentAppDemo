import { Dispatch } from "react"

export enum DEPARTMENT_ACTION_TYPES {
  CREATE = "CREATE_DEPARTMENT",
  UPDATE = "UPDATE_DEPARTMENT",
  DELETE = "DELETE_DEPARTMENT",
}

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

export const createDepartment: any =
  (department: ICreateDepartment) =>
  (dispatch: Dispatch<CreateDepartmentAction>) => {
    dispatch({
      type: DEPARTMENT_ACTION_TYPES.CREATE,
      payload: department,
    })
  }

export const updateDepartment: any =
  (department: IDepartment) => (dispatch: Dispatch<UpdateDepartmentAction>) => {
    dispatch({
      type: DEPARTMENT_ACTION_TYPES.UPDATE,
      payload: department,
    })
  }

export const deleteDepartment: any =
  (departmentId: string) => (dispatch: Dispatch<DeleteDepartmentAction>) => {
    dispatch({
      type: DEPARTMENT_ACTION_TYPES.DELETE,
      payload: departmentId,
    })
  }

export interface CreateDepartmentAction {
  type: DEPARTMENT_ACTION_TYPES
  payload: ICreateDepartment
}

export interface UpdateDepartmentAction {
  type: DEPARTMENT_ACTION_TYPES
  payload: IDepartment
}

export interface DeleteDepartmentAction {
  type: DEPARTMENT_ACTION_TYPES
  payload: string
}
