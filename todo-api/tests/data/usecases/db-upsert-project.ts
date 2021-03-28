import { DbUpsertProject } from '@/data/usecases'
import { UpsertProjectRepositorySpy } from '@/tests/data/mocks'
import { throwError, mockAddProjectParams } from '@/tests/domain/mocks'
import faker from 'faker'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbUpsertProject
  upsertProjectRepositorySpy: UpsertProjectRepositorySpy
}

const makeSut = (): SutTypes => {
  const upsertProjectRepositorySpy = new UpsertProjectRepositorySpy()
  const sut = new DbUpsertProject(upsertProjectRepositorySpy)
  return {
    sut,
    upsertProjectRepositorySpy
  }
}

describe('DbUpsertProject Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call UpsertProjectRepositorySpy with correct values', async () => {
    const { sut, upsertProjectRepositorySpy } = makeSut()
    const projectId = faker.random.uuid()
    const data = mockAddProjectParams()
    await sut.upsert(projectId, data)
    expect(upsertProjectRepositorySpy.projectId).toEqual(projectId)
    expect(upsertProjectRepositorySpy.params).toEqual(data)
  })

  test('Should throw if UpsertProjectRepositorySpy throws', async () => {
    const { sut, upsertProjectRepositorySpy } = makeSut()
    jest.spyOn(upsertProjectRepositorySpy, 'upsert').mockImplementationOnce(throwError)
    const promise = sut.upsert(faker.random.uuid(), mockAddProjectParams())
    await expect(promise).rejects.toThrow()
  })
})
