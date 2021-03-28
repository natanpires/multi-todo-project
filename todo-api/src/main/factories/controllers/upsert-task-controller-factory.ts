import { makeLogControllerDecorator, makeDbUpsertTask } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { UpsertTaskController } from '@/presentation/controllers'

export const makeUpsertTaskController = (): Controller => {
  const controller = new UpsertTaskController(makeDbUpsertTask())
  return makeLogControllerDecorator(controller)
}
