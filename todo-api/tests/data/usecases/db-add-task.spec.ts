import { DbAddTask } from '@/data/usecases'
import { AddTaskRepositorySpy } from '@/tests/data/mocks'
import { throwError, mockAddTaskParams } from '@/tests/domain/mocks'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbAddTask
  addTaskRepositorySpy: AddTaskRepositorySpy
}

const makeSut = (): SutTypes => {
  const addTaskRepositorySpy = new AddTaskRepositorySpy()
  const sut = new DbAddTask(addTaskRepositorySpy)
  return {
    sut,
    addTaskRepositorySpy
  }
}

describe('DbAddTask Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddTaskRepository with correct values', async () => {
    const { sut, addTaskRepositorySpy } = makeSut()
    const taskData = mockAddTaskParams()
    await sut.add(taskData)
    expect(addTaskRepositorySpy.params).toEqual(taskData)
  })

  test('Should throw if AddTaskRepository throws', async () => {
    const { sut, addTaskRepositorySpy } = makeSut()
    jest.spyOn(addTaskRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddTaskParams())
    await expect(promise).rejects.toThrow()
  })
})
