import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, serverError } from '@/presentation/helpers'
import { UpsertProject } from '@/domain/usecases'

export class UpsertProjectController implements Controller {
  constructor (private readonly upsertProject: UpsertProject) {}

  async handle (request: UpsertProjectController.Request): Promise<HttpResponse> {
    try {
      await this.upsertProject.upsert(request.projectId, request)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpsertProjectController {
  export type Request = {
    accountId: string
    name?: string
    projectId: string
  }
}
