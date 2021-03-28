import { LoadProjectsController } from '@/presentation/controllers'
import { ok, serverError, noContent } from '@/presentation/helpers'
import { LoadProjectsSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): LoadProjectsController.Request => ({ accountId: faker.random.uuid() })

type SutTypes = {
  sut: LoadProjectsController
  loadProjectsSpy: LoadProjectsSpy
}

const makeSut = (): SutTypes => {
  const loadProjectsSpy = new LoadProjectsSpy()
  const sut = new LoadProjectsController(loadProjectsSpy)
  return {
    sut,
    loadProjectsSpy
  }
}

describe('LoadProjects Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadProjects with correct value', async () => {
    const { sut, loadProjectsSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadProjectsSpy.accountId).toBe(request.accountId)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadProjectsSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadProjectsSpy.result))
  })

  test('Should return 204 if LoadProjects returns empty', async () => {
    const { sut, loadProjectsSpy } = makeSut()
    loadProjectsSpy.result = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadProjects throws', async () => {
    const { sut, loadProjectsSpy } = makeSut()
    jest.spyOn(loadProjectsSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
