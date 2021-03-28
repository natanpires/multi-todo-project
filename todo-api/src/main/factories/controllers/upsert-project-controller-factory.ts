import { makeLogControllerDecorator, makeDbUpsertProject } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { UpsertProjectController } from '@/presentation/controllers'

export const makeUpsertProjectController = (): Controller => {
  const controller = new UpsertProjectController(makeDbUpsertProject())
  return makeLogControllerDecorator(controller)
}
