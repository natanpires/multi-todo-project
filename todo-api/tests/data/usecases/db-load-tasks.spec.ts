import { DbLoadTasks } from '@/data/usecases'
import { LoadTasksRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadTasks
  loadTasksRepositorySpy: LoadTasksRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadTasksRepositorySpy = new LoadTasksRepositorySpy()
  const sut = new DbLoadTasks(loadTasksRepositorySpy)
  return {
    sut,
    loadTasksRepositorySpy
  }
}

describe('DbLoadTasks', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadTasksRepository', async () => {
    const { sut, loadTasksRepositorySpy } = makeSut()
    const accountId = faker.random.uuid()
    const projectId = faker.random.uuid()
    await sut.load(projectId, accountId)
    expect(loadTasksRepositorySpy.projectId).toBe(projectId)
  })

  test('Should return a list of Tasks on success', async () => {
    const { sut, loadTasksRepositorySpy } = makeSut()
    const projects = await sut.load(faker.random.uuid(), faker.random.uuid())
    expect(projects).toEqual(loadTasksRepositorySpy.result)
  })

  test('Should throw if LoadTasksRepository throws', async () => {
    const { sut, loadTasksRepositorySpy } = makeSut()
    jest.spyOn(loadTasksRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load(faker.random.uuid(), faker.random.uuid())
    await expect(promise).rejects.toThrow()
  })
})
