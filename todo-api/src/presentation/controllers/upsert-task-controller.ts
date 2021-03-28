import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, serverError } from '@/presentation/helpers'
import { UpsertTask } from '@/domain/usecases'

export class UpsertTaskController implements Controller {
  constructor (private readonly upsertTask: UpsertTask) {}

  async handle (request: UpsertTaskController.Request): Promise<HttpResponse> {
    try {
      await this.upsertTask.upsert(request.taskId, request)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpsertTaskController {
  export type Request = {
    taskId: string
    projectId: string
    accountId: string
    name?: string
    isFinished?: boolean
    finishedAt?: Date
  }
}
