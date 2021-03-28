import { UpsertTaskController } from '@/presentation/controllers'
import { serverError, noContent } from '@/presentation/helpers'
import { UpsertTaskSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): UpsertTaskController.Request => ({
  accountId: faker.random.uuid(),
  projectId: faker.random.uuid(),
  taskId: faker.random.uuid(),
  name: faker.random.word()
})

type SutTypes = {
  sut: UpsertTaskController
  upsertTaskSpy: UpsertTaskSpy
}

const makeSut = (): SutTypes => {
  const upsertTaskSpy = new UpsertTaskSpy()
  const sut = new UpsertTaskController(upsertTaskSpy)
  return {
    sut,
    upsertTaskSpy
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
    const { sut, upsertTaskSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(upsertTaskSpy.taskId).toEqual(request.taskId)
    expect(upsertTaskSpy.params).toEqual({ ...request })
  })

  test('Should return 500 if UpsertProject throws', async () => {
    const { sut, upsertTaskSpy } = makeSut()
    jest.spyOn(upsertTaskSpy, 'upsert').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
