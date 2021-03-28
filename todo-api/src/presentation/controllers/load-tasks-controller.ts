import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, serverError, ok } from '@/presentation/helpers'
import { LoadTasks } from '@/domain/usecases'

export class LoadTasksController implements Controller {
  constructor (private readonly loadTasks: LoadTasks) {}

  async handle (request: LoadTasksController.Request): Promise<HttpResponse> {
    try {
      const tasks = await this.loadTasks.load(request.projectId, request.accountId)
      return tasks.length ? ok(tasks) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadTasksController {
  export type Request = {
    projectId: string
    accountId: string
  }
}
