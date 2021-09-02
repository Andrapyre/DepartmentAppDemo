import {
  tryCatch,
  TaskEither,
  chain,
  of as TaskEitherOf,
  fromEither,
} from "fp-ts/lib/TaskEither"
import * as O from "fp-ts/lib/Option"
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
import { compact } from "fp-ts/lib/Array"

export default class DynamoDepartmentRepository {
  private readonly client: DynamoDBDocumentClient
  private readonly tableName: string
  constructor(client: DynamoDBDocumentClient, tableName: string) {
    this.client = client
    this.tableName = tableName
  }

  public getAllDepartments(): TaskEither<ApplicationError, IDepartment[]> {
    const command = new ScanCommand({
      TableName: this.tableName,
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
          const allItems: O.Option<IDepartment>[] = result.Items.map((item) => {
            return pipe(
              DepartmentParser(item),
              fold(
                (_) => O.none,
                (department) => {
                  const help = O.some(department)
                  return help
                }
              )
            )
          })
          return TaskEitherOf(compact(allItems))
        } else return TaskEitherOf([])
      })
    )
  }

  public getDepartment(id: string) {
    const command = new GetCommand({
      TableName: this.tableName,
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
      TableName: this.tableName,
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
  ): TaskEither<ApplicationError, IDepartment> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: department,
    })
    return pipe(
      tryCatch(
        async () => {
          await this.client.send(command)
          return department
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
