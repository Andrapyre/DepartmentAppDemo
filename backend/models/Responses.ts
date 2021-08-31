export interface ApiResponse<T> {
  statusCode: number
  body?: T
}

export const JsonParseErrorResponse = (): ApiResponse<string> => {
  return {
    statusCode: 400,
    body: "Error parsing Json body. Please check the format and try again.",
  }
}

export const DepartmentIdParseErrorResponse = (): ApiResponse<string> => {
  return {
    statusCode: 400,
    body: "The customer id is not valid. Please retry with a valid customer id.",
  }
}

export const ServerErrorResponse = (): ApiResponse<string> => {
  return {
    statusCode: 500,
    body: "The server encountered an unexpected error. Please try again later.",
  }
}

export const SuccessfulResponse = <T>(body: T): ApiResponse<T> => {
  return {
    statusCode: 200,
    body: body,
  }
}
