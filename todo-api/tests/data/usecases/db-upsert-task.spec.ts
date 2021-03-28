import { DbUpsertTask } from '@/data/usecases'
import { UpsertTaskRepositorySpy } from '@/tests/data/mocks'
import { throwError, mockAddTaskParams } from '@/tests/domain/mocks'
import faker from 'faker'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbUpsertTask
  upsertTaskRepositorySpy: UpsertTaskRepositorySpy
}

const makeSut = (): SutTypes => {
  const upsertTaskRepositorySpy = new UpsertTaskRepositorySpy()
  const sut = new DbUpsertTask(upsertTaskRepositorySpy)
  return {
    sut,
    upsertTaskRepositorySpy
  }
}

describe('DbUpsertTask Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call UpsertTaskRepositorySpy with correct values', async () => {
    const { sut, upsertTaskRepositorySpy } = makeSut()
    const taskId = faker.random.uuid()
    const data = mockAddTaskParams()
    await sut.upsert(taskId, data)
    expect(upsertTaskRepositorySpy.taskId).toEqual(taskId)
    expect(upsertTaskRepositorySpy.params).toEqual(data)
  })

  test('Should throw if UpsertTaskRepositorySpy throws', async () => {
    const { sut, upsertTaskRepositorySpy } = makeSut()
    jest.spyOn(upsertTaskRepositorySpy, 'upsert').mockImplementationOnce(throwError)
    const promise = sut.upsert(faker.random.uuid(), mockAddTaskParams())
    await expect(promise).rejects.toThrow()
  })
})
