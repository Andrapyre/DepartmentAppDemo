import {
  struct,
  string as stringType,
  DecodeError,
  literal,
} from "io-ts/Decoder"
import {
  Either,
  tryCatch,
  toError,
  left,
  right,
  chain,
  fold,
} from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"
import {
  ApplicationError,
  JsonParseError,
  DepartmentIdParsingError,
} from "../models/ApplicationError"
import { ICreateDepartment, IDepartment } from "../../models/Department"

const parseJson = (json: string): Either<ApplicationError, unknown> => {
  return tryCatch(
    () => JSON.parse(json),
    (e) => {
      return new JsonParseError(toError(e).message)
    }
  )
}

//this method is necessary to convert a struct decoder from a DecodeError type to a ApplicationError type
//it is intended to be used with a "StructName".decode function and a request body previously parsed from JSON
const parseDecoderToApplicationErrorType = <ResponseBody>(
  body: unknown,
  decoder: (body: unknown) => Either<DecodeError, ResponseBody>
): Either<ApplicationError, ResponseBody> => {
  return pipe(
    decoder(body),
    fold((e) => left(new JsonParseError(toError(e).message)), right)
  )
}

const bodyParser = <ResponseBody>(
  body: string,
  decoder: (body: unknown) => Either<DecodeError, ResponseBody>
) => {
  return pipe(
    body,
    parseJson,
    chain((result) =>
      parseDecoderToApplicationErrorType<ResponseBody>(result, decoder)
    )
  )
}

const createDepartmentStruct = struct<ICreateDepartment>({
  departmentName: stringType,
  contactName: stringType,
  contactEmail: stringType,
  contactPhone: stringType,
})

const departmentStruct = struct<IDepartment>({
  departmentId: stringType,
  departmentName: stringType,
  contactName: stringType,
  contactEmail: stringType,
  contactPhone: stringType,
})

export const CreateDepartmentParser = (
  body: string
): Either<ApplicationError, ICreateDepartment> => {
  return bodyParser(body, createDepartmentStruct.decode)
}

export const DepartmentParser = (
  body: unknown
): Either<ApplicationError, IDepartment> => {
  return parseDecoderToApplicationErrorType(body, departmentStruct.decode)
}

export const DepartmentIdParser = (
  departmentId: unknown
): Either<ApplicationError, Number> => {
  const parsedDepartmentId = Number(departmentId)
  if (Number.isNaN(parsedDepartmentId) || parsedDepartmentId < 0) {
    return left(new DepartmentIdParsingError("Unable to parse department id."))
  } else return right(parsedDepartmentId)
}
