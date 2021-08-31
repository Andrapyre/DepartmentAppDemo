enum LogType {
  ERROR = "error",
}

class Logger {
  public error(msg: string, customerId: string, requestBody: string) {
    const log = {
      type: LogType.ERROR,
      customerId,
      requestBody,
      message: msg,
    }
    console.log(log)
  }
}

export default new Logger()
