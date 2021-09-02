import { DDBClient } from "./repository/DDBClient"
import DynamoDepartmentRepository from "./repository/DynamoDepartmentRepository"

const ddbClient = DDBClient()
const getTableNameFromEnv = (): string => {
  if (process.env.TABLE_NAME) {
    return process.env.TABLE_NAME
  } else {
    throw new Error("configuration could not load")
  }
}

const tableName =
  process.env.NODE_ENV === "production"
    ? getTableNameFromEnv()
    : "department-app-demo-local"
export const repository = new DynamoDepartmentRepository(ddbClient, tableName)

export {}
