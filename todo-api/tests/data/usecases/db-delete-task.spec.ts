import { DbDeleteTask } from '@/data/usecases'
import { DeleteTaskRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'
import faker from 'faker'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbDeleteTask
  deleteTaskRepositorySpy: DeleteTaskRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteTaskRepositorySpy = new DeleteTaskRepositorySpy()
  const sut = new DbDeleteTask(deleteTaskRepositorySpy)
  return {
    sut,
    deleteTaskRepositorySpy
  }
}

describe('DbDeleteTask Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call DeleteTaskRepositorySpy with correct values', async () => {
    const { sut, deleteTaskRepositorySpy } = makeSut()
    const taskId = faker.random.uuid()
    await sut.delete(taskId)
    expect(deleteTaskRepositorySpy.taskId).toEqual(taskId)
  })

  test('Should throw if DeleteTaskRepositorySpy throws', async () => {
    const { sut, deleteTaskRepositorySpy } = makeSut()
    jest.spyOn(deleteTaskRepositorySpy, 'delete').mockImplementationOnce(throwError)
    const promise = sut.delete(faker.random.uuid())
    await expect(promise).rejects.toThrow()
  })
})
