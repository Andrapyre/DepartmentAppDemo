// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pipe } from "fp-ts/lib/function"
import * as TE from "fp-ts/lib/TaskEither"
import * as TASK from "fp-ts/lib/Task"
import type { NextApiRequest, NextApiResponse } from "next"
import { ApplicationErrorResponseMatcher } from "../../backend/models/ApplicationError"
import { Department, IDepartment } from "../../models/Department"
import { CreateDepartmentParser } from "../../backend/utils/Parser"
import { guid } from "../../backend/utils/utils"
import { repository } from "../../backend/Application"
import Logger from "../../backend/utils/Logger"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IDepartment[] | string | IDepartment>
) {
  if (req.method === "GET") {
    return getAllDepartments(res)
  } else if (req.method === "POST") {
    return postDepartment(req.body, res)
  } else {
    return res.status(401).send
  }
}

const postDepartment = (
  body: unknown,
  res: NextApiResponse<IDepartment | string>
): Promise<void> => {
  const process = pipe(
    TE.fromEither(CreateDepartmentParser(body)),
    TE.chain((createDepartment) => {
      return pipe(
        TE.fromIOEither(guid()),
        TE.chain((guid) => {
          const department = new Department().fromCreateDepartment(
            guid,
            createDepartment
          )
          return repository.putDepartment(department)
        })
      )
    }),
    TE.fold(
      (e) => {
        const response = ApplicationErrorResponseMatcher(e)
        const msg = response.body ? response.body : ""
        Logger.error(e.errorMessage, e.type, body)
        return TASK.of(res.status(response.statusCode).send(msg))
      },
      (department) => {
        return TASK.of(res.status(200).json(department))
      }
    )
  )
  return process()
}

const getAllDepartments = (
  res: NextApiResponse<IDepartment[] | string>
): Promise<void> => {
  const process = pipe(
    repository.getAllDepartments(),
    TE.fold(
      (e) => {
        const response = ApplicationErrorResponseMatcher(e)
        const msg = response.body ? response.body : ""
        Logger.error(e.errorMessage, e.type)
        return TASK.of(res.status(response.statusCode).send(msg))
      },
      (departments) => {
        return TASK.of(res.status(200).json(departments))
      }
    )
  )
  return process()
}
