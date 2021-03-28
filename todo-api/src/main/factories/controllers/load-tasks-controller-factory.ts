import { makeLogControllerDecorator, makeDbLoadTasks } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoadTasksController } from '@/presentation/controllers'

export const makeLoadTasksController = (): Controller => {
  const controller = new LoadTasksController(makeDbLoadTasks())
  return makeLogControllerDecorator(controller)
}
