import { DbAddProject } from '@/data/usecases'
import { AddProjectRepositorySpy } from '@/tests/data/mocks'
import { throwError, mockAddProjectParams } from '@/tests/domain/mocks'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbAddProject
  addProjectRepositorySpy: AddProjectRepositorySpy
}

const makeSut = (): SutTypes => {
  const addProjectRepositorySpy = new AddProjectRepositorySpy()
  const sut = new DbAddProject(addProjectRepositorySpy)
  return {
    sut,
    addProjectRepositorySpy
  }
}

describe('DbAddProject Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddTaskRepository with correct values', async () => {
    const { sut, addProjectRepositorySpy } = makeSut()
    const projectData = mockAddProjectParams()
    await sut.add(projectData)
    expect(addProjectRepositorySpy.params).toEqual(projectData)
  })

  test('Should throw if AddTaskRepository throws', async () => {
    const { sut, addProjectRepositorySpy } = makeSut()
    jest.spyOn(addProjectRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddProjectParams())
    await expect(promise).rejects.toThrow()
  })
})
