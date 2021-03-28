import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, serverError, ok } from '@/presentation/helpers'
import { LoadProjects } from '@/domain/usecases'

export class LoadProjectsController implements Controller {
  constructor (private readonly loadProjects: LoadProjects) {}

  async handle (request: LoadProjectsController.Request): Promise<HttpResponse> {
    try {
      const projects = await this.loadProjects.load(request.accountId)
      return projects.length ? ok(projects) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadProjectsController {
  export type Request = {
    accountId: string
  }
}
