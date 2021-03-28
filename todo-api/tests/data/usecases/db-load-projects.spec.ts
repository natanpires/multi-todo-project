import { DbLoadProjects } from '@/data/usecases'
import { LoadProjectsRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadProjects
  loadProjectsRepositorySpy: LoadProjectsRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadProjectsRepositorySpy = new LoadProjectsRepositorySpy()
  const sut = new DbLoadProjects(loadProjectsRepositorySpy)
  return {
    sut,
    loadProjectsRepositorySpy
  }
}

describe('DbLoadProjects', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadProjectsRepository', async () => {
    const { sut, loadProjectsRepositorySpy } = makeSut()
    const accountId = faker.random.uuid()
    await sut.load(accountId)
    expect(loadProjectsRepositorySpy.accountId).toBe(accountId)
  })

  test('Should return a list of Projects on success', async () => {
    const { sut, loadProjectsRepositorySpy } = makeSut()
    const projects = await sut.load(faker.random.uuid())
    expect(projects).toEqual(loadProjectsRepositorySpy.result)
  })

  test('Should throw if LoadProjectsRepository throws', async () => {
    const { sut, loadProjectsRepositorySpy } = makeSut()
    jest.spyOn(loadProjectsRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load(faker.random.uuid())
    await expect(promise).rejects.toThrow()
  })
})
