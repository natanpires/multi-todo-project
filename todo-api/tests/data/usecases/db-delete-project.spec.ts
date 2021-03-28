import { DbDeleteProject } from '@/data/usecases'
import { DeleteProjectRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbDeleteProject
  deleteProjectRepositorySpy: DeleteProjectRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteProjectRepositorySpy = new DeleteProjectRepositorySpy()
  const sut = new DbDeleteProject(deleteProjectRepositorySpy)
  return {
    sut,
    deleteProjectRepositorySpy
  }
}

describe('DbDeleteProject Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call DeleteProjectRepositorySpy with correct values', async () => {
    const { sut, deleteProjectRepositorySpy } = makeSut()
    const projectId = faker.random.uuid()
    await sut.delete(projectId)
    expect(deleteProjectRepositorySpy.projectId).toEqual(projectId)
  })

  test('Should throw if DeleteProjectRepositorySpy throws', async () => {
    const { sut, deleteProjectRepositorySpy } = makeSut()
    jest.spyOn(deleteProjectRepositorySpy, 'delete').mockImplementationOnce(throwError)
    const promise = sut.delete(faker.random.uuid())
    await expect(promise).rejects.toThrow()
  })
})
