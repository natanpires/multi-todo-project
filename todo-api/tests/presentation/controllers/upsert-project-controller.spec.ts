import { UpsertProjectController } from '@/presentation/controllers'
import { serverError, noContent } from '@/presentation/helpers'
import { UpsertProjectSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): UpsertProjectController.Request => ({
  accountId: faker.random.uuid(),
  projectId: faker.random.uuid(),
  name: faker.random.word()
})

type SutTypes = {
  sut: UpsertProjectController
  upsertProjectSpy: UpsertProjectSpy
}

const makeSut = (): SutTypes => {
  const upsertProjectSpy = new UpsertProjectSpy()
  const sut = new UpsertProjectController(upsertProjectSpy)
  return {
    sut,
    upsertProjectSpy
  }
}

describe('UpsertProject Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call UpsertProject with correct values', async () => {
    const { sut, upsertProjectSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(upsertProjectSpy.projectId).toEqual(request.projectId)
    expect(upsertProjectSpy.params).toEqual({ ...request })
  })

  test('Should return 500 if UpsertProject throws', async () => {
    const { sut, upsertProjectSpy } = makeSut()
    jest.spyOn(upsertProjectSpy, 'upsert').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
