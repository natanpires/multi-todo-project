import { DeleteProjectController } from '@/presentation/controllers'
import { serverError, noContent } from '@/presentation/helpers'
import { DeleteProjectSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): DeleteProjectController.Request => ({
  projectId: faker.random.uuid()
})

type SutTypes = {
  sut: DeleteProjectController
  deleteProjectSpy: DeleteProjectSpy
}

const makeSut = (): SutTypes => {
  const deleteProjectSpy = new DeleteProjectSpy()
  const sut = new DeleteProjectController(deleteProjectSpy)
  return {
    sut,
    deleteProjectSpy
  }
}

describe('DeleteProject Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call DeleteProject with correct values', async () => {
    const { sut, deleteProjectSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(deleteProjectSpy.id).toEqual(request.projectId)
  })

  test('Should return 500 if DeleteProject throws', async () => {
    const { sut, deleteProjectSpy } = makeSut()
    jest.spyOn(deleteProjectSpy, 'delete').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
