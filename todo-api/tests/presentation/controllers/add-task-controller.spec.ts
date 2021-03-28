import { AddTaskController } from '@/presentation/controllers'
import { badRequest, serverError, noContent } from '@/presentation/helpers'
import { ValidationSpy, AddTaskSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): AddTaskController.Request => ({
  name: faker.random.words(),
  projectId: faker.random.uuid(),
  accountId: faker.random.uuid()
})

type SutTypes = {
  sut: AddTaskController
  validationSpy: ValidationSpy
  addTaskSpy: AddTaskSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addTaskSpy = new AddTaskSpy()
  const sut = new AddTaskController(validationSpy, addTaskSpy)
  return {
    sut,
    validationSpy,
    addTaskSpy
  }
}

describe('AddTask Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddProject with correct values', async () => {
    const { sut, addTaskSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addTaskSpy.params)
      .toEqual(
        {
          ...request,
          date: new Date(),
          projectId: addTaskSpy.params.projectId,
          accountId: addTaskSpy.params.accountId,
          taskId: addTaskSpy.params.taskId,
          isFinished: false,
          finishedAt: null
        }
      )
  })

  test('Should return 500 if AddProject throws', async () => {
    const { sut, addTaskSpy } = makeSut()
    jest.spyOn(addTaskSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
