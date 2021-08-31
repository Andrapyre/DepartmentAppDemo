import {
  tryCatch,
  TaskEither,
  chain,
  of as TaskEitherOf,
  fromEither,
} from "fp-ts/lib/TaskEither"
import O from "fp-ts/lib/Option"
import { fold, toError } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"
import { ApplicationError, ServerError } from "../models/ApplicationError"

import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb"
import { IDepartment } from "../../models/Department"
import { DepartmentParser } from "../utils/Parser"

export default class DynamoDepartmentRepository {
  private readonly client: DynamoDBDocumentClient
  constructor(client: DynamoDBDocumentClient) {
    this.client = client
  }

  public getAllDepartments(): TaskEither<ApplicationError, IDepartment[]> {
    const command = new ScanCommand({
      TableName: process.env.TABLE_NAME,
    })
    return pipe(
      tryCatch(
        async () => {
          return await this.client.send(command)
        },
        (e) => {
          const msg = `${
            toError(e).message
          } when sending ScanCommand to DynamoDB`
          return new ServerError(msg)
        }
      ),
      chain((result) => {
        if (result.Items) {
          const allItems: IDepartment[] = result.Items.flatMap((item) => {
            return pipe(
              DepartmentParser(item),
              fold(
                (_) => O.none,
                (department) => O.some(department)
              )
            )
          })
          O.flatMap(allItems)
        } else return TaskEitherOf([])
      })
    )
  }

  public getDepartment(id: string) {
    const command = new GetCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        departmentId: id,
      },
    })
    return pipe(
      tryCatch(
        async () => {
          return await this.client.send(command)
        },
        (e) => {
          const msg = `${
            toError(e).message
          } when sending GetCommand to DynamoDB`
          return new ServerError(msg)
        }
      ),
      chain((result) => fromEither(DepartmentParser(result?.Item)))
    )
  }

  public deleteDepartment(id: string): TaskEither<ApplicationError, void> {
    const command = new DeleteCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        departmentId: id,
      },
    })
    return pipe(
      tryCatch(
        async () => {
          await this.client.send(command)
        },
        (e) => {
          const msg = `${
            toError(e).message
          } when sending DeleteCommand to DynamoDB`
          return new ServerError(msg)
        }
      )
    )
  }

  public putDepartment(
    department: IDepartment
  ): TaskEither<ApplicationError, void> {
    const command = new PutCommand({
      TableName: process.env.TABLE_NAME,
      Item: department,
    })
    return pipe(
      tryCatch(
        async () => {
          await this.client.send(command)
        },
        (e) => {
          const msg = `${
            toError(e).message
          } when sending PutCommand to DynamoDB`
          return new ServerError(msg)
        }
      )
    )
  }
}
