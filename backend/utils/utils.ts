import * as uuid from "uuid"
import { IOEither, rightIO } from "fp-ts/lib/IOEither"
import { of as ioOf } from "fp-ts/lib/IO"
import { ApplicationError } from "../models/ApplicationError"

export const guid = (): IOEither<ApplicationError, string> => {
  return rightIO(ioOf(uuid.v4()))
}

export const timestamp = (): IOEither<ApplicationError, number> => {
  return rightIO(ioOf(Date.now()))
}
