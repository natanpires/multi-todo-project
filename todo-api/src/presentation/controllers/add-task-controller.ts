import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers'
import { AddTask } from '@/domain/usecases'
import { v4 } from 'uuid'

export class AddTaskController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addTask: AddTask
  ) {}

  async handle (request: AddTaskController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.addTask.add({
        ...request,
        date: new Date(),
        taskId: v4(),
        isFinished: false,
        finishedAt: null
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddTaskController {
  export type Request = {
    name: string
    projectId: string
    accountId: string
  }
}
