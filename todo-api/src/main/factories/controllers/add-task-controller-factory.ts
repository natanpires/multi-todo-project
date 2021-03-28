import { makeAddTaskValidation, makeLogControllerDecorator, makeDbAddTask } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { AddTaskController } from '@/presentation/controllers'

export const makeAddTaskController = (): Controller => {
  const controller = new AddTaskController(makeAddTaskValidation(), makeDbAddTask())
  return makeLogControllerDecorator(controller)
}
