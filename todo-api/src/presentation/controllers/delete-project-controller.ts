import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, serverError } from '@/presentation/helpers'
import { DeleteProject } from '@/domain/usecases'

export class DeleteProjectController implements Controller {
  constructor (private readonly deleteProject: DeleteProject) {}

  async handle (request: DeleteProjectController.Request): Promise<HttpResponse> {
    try {
      await this.deleteProject.delete(request.projectId)
      return noContent()
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}

export namespace DeleteProjectController {
  export type Request = {
    projectId: string
  }
}
