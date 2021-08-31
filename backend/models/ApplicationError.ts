import { ApiResponse } from "./Responses"
import {
  JsonParseErrorResponse,
  DepartmentIdParseErrorResponse,
  ServerErrorResponse,
} from "./Responses"

export enum ApplicationErrorType {
  SERVER_ERROR = "ServerError",
  JSON_PARSE_ERROR = "JsonParseError",
  DEPT_ID_PARSE_ERROR = "DepartmentIdParseError",
}

export interface ApplicationError {
  errorMessage: string
  type: ApplicationErrorType
}

export class ServerError implements ApplicationError {
  readonly errorMessage: string
  readonly type: ApplicationErrorType
  constructor(message: string) {
    this.errorMessage = message
    this.type = ApplicationErrorType.SERVER_ERROR
  }
}

export class JsonParseError implements ApplicationError {
  readonly errorMessage: string
  readonly type: ApplicationErrorType
  constructor(message: string) {
    this.errorMessage = message
    this.type = ApplicationErrorType.JSON_PARSE_ERROR
  }
}

export class DepartmentIdParsingError implements ApplicationError {
  readonly errorMessage: string
  readonly type: ApplicationErrorType
  constructor(message: string) {
    this.errorMessage = message
    this.type = ApplicationErrorType.DEPT_ID_PARSE_ERROR
  }
}

export const ApplicationErrorResponseMatcher = (
  e: ApplicationError
): ApiResponse => {
  switch (e.type) {
    case ApplicationErrorType.SERVER_ERROR:
      return ServerErrorResponse()
    case ApplicationErrorType.DEPT_ID_PARSE_ERROR:
      return DepartmentIdParseErrorResponse()
    case ApplicationErrorType.JSON_PARSE_ERROR:
      return JsonParseErrorResponse()
  }
}
