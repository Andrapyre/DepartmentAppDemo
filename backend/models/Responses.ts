export interface ApiResponse {
  statusCode: number
  body?: string
}

export const JsonParseErrorResponse = (): ApiResponse => {
  return {
    statusCode: 400,
    body: "Error parsing Json body. Please check the format and try again.",
  }
}

export const DepartmentIdParseErrorResponse = (): ApiResponse => {
  return {
    statusCode: 400,
    body: "The customer id is not valid. Please retry with a valid customer id.",
  }
}

export const ServerErrorResponse = (): ApiResponse => {
  return {
    statusCode: 500,
    body: "The server encountered an unexpected error. Please try again later.",
  }
}

export const SuccessfulResponse = (): ApiResponse => {
  return {
    statusCode: 200,
    body: "feedback was successfully processed",
  }
}
