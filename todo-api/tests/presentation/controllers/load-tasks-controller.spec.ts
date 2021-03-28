import { LoadTasksController } from '@/presentation/controllers'
import { ok, serverError, noContent } from '@/presentation/helpers'
import { LoadTasksSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): LoadTasksController.Request => ({ accountId: faker.random.uuid(), projectId: faker.random.uuid() })

type SutTypes = {
  sut: LoadTasksController
  loadTasksSpy: LoadTasksSpy
}

const makeSut = (): SutTypes => {
  const loadTasksSpy = new LoadTasksSpy()
  const sut = new LoadTasksController(loadTasksSpy)
  return {
    sut,
    loadTasksSpy
  }
}

describe('LoadTasks Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadTasks with correct value', async () => {
    const { sut, loadTasksSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadTasksSpy.accountId).toBe(request.accountId)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadTasksSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadTasksSpy.result))
  })

  test('Should return 204 if LoadTasks returns empty', async () => {
    const { sut, loadTasksSpy } = makeSut()
    loadTasksSpy.result = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadTasks throws', async () => {
    const { sut, loadTasksSpy } = makeSut()
    jest.spyOn(loadTasksSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
