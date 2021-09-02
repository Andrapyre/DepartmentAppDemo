enum LogType {
  ERROR = "error",
}

class Logger {
  public error(msg: string, errorType?: string, requestBody?: unknown) {
    const log = {
      type: LogType.ERROR,
      errorType,
      requestBody,
      message: msg,
    }
    console.log(log)
  }
}

export default new Logger()
