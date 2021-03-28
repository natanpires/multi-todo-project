import { DeleteTaskController } from '@/presentation/controllers'
import { serverError, noContent } from '@/presentation/helpers'
import { DeleteTaskSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): DeleteTaskController.Request => ({
  taskId: faker.random.uuid()
})

type SutTypes = {
  sut: DeleteTaskController
  deleteTaskSpy: DeleteTaskSpy
}

const makeSut = (): SutTypes => {
  const deleteTaskSpy = new DeleteTaskSpy()
  const sut = new DeleteTaskController(deleteTaskSpy)
  return {
    sut,
    deleteTaskSpy
  }
}

describe('DeleteTask Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call DeleteTask with correct values', async () => {
    const { sut, deleteTaskSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(deleteTaskSpy.taskId).toEqual(request.taskId)
  })

  test('Should return 500 if DeleteTask throws', async () => {
    const { sut, deleteTaskSpy } = makeSut()
    jest.spyOn(deleteTaskSpy, 'delete').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
