import { ProjectMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddProjectParams, mockAddAccountParams } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'

let projectCollection: Collection
let accountCollection: Collection

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return res.ops[0]._id
}

const mockProjectId = async (accountId: string): Promise<string> => {
  const res = await projectCollection.insertOne(mockAddProjectParams(accountId))
  return res.ops[0].projectId
}

const makeSut = (): ProjectMongoRepository => {
  return new ProjectMongoRepository()
}

describe('ProjectMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    projectCollection = await MongoHelper.getCollection('projects')
    await projectCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a project on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddProjectParams())
      const count = await projectCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    test('Should load all projects on success', async () => {
      const accountId = await mockAccountId()
      const addProjectModels = [mockAddProjectParams(accountId), mockAddProjectParams(accountId)]
      await projectCollection.insertMany(addProjectModels)
      const sut = makeSut()
      const projects = await sut.loadAll(accountId)
      expect(projects.length).toBe(2)
      expect(projects[0].id).toBeTruthy()
      expect(projects[0].name).toBe(addProjectModels[0].name)
      expect(projects[1].name).toBe(addProjectModels[1].name)
    })

    test('Should load empty list', async () => {
      const accountId = await mockAccountId()
      const sut = makeSut()
      const projects = await sut.loadAll(accountId)
      expect(projects.length).toBe(0)
    })
  })

  describe('upsert()', () => {
    test('Should upsert a project on success', async () => {
      const sut = makeSut()
      const accountId = await mockAccountId()
      const projectId = await mockProjectId(accountId)
      await sut.upsert(projectId, mockAddProjectParams())
      const count = await projectCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('delete()', () => {
    test('Should delete a project on success', async () => {
      const sut = makeSut()
      const accountId = await mockAccountId()
      const projectId = await mockProjectId(accountId)
      await sut.delete(projectId)
      const count = await projectCollection.countDocuments()
      expect(count).toBe(0)
    })
  })
})
