import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, serverError } from '@/presentation/helpers'
import { DeleteTask } from '@/domain/usecases'

export class DeleteTaskController implements Controller {
  constructor (private readonly deleteTask: DeleteTask) {}

  async handle (request: DeleteTaskController.Request): Promise<HttpResponse> {
    try {
      await this.deleteTask.delete(request.taskId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteTaskController {
  export type Request = {
    taskId: string
  }
}
