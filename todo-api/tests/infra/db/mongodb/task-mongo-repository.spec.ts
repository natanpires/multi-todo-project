import { TaskMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddProjectParams, mockAddAccountParams, mockAddTaskParams } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'

let projectCollection: Collection
let projectTasksCollection: Collection
let accountCollection: Collection

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return res.ops[0]._id
}

const mockProjectId = async (accountId: string): Promise<string> => {
  const res = await projectCollection.insertOne(mockAddProjectParams(accountId))
  return res.ops[0].projectId
}

const mockTaskId = async (projectId: string, accountId: string): Promise<string> => {
  const res = await projectTasksCollection.insertOne(mockAddTaskParams(projectId, accountId))
  return res.ops[0].taskId
}

const makeSut = (): TaskMongoRepository => {
  return new TaskMongoRepository()
}

describe('TaskMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    projectCollection = await MongoHelper.getCollection('projects')
    await projectCollection.deleteMany({})
    projectTasksCollection = await MongoHelper.getCollection('projectTasks')
    await projectTasksCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a task on success', async () => {
      const accountId = await mockAccountId()
      const projectId = await mockProjectId(accountId)
      const sut = makeSut()
      await sut.add(mockAddTaskParams(projectId, accountId))
      const count = await projectCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    test('Should load all tasks on success', async () => {
      const accountId = await mockAccountId()
      const projectId = await mockProjectId(accountId)
      const addTaskModels = [mockAddTaskParams(projectId, accountId), mockAddTaskParams(projectId, accountId)]
      await projectTasksCollection.insertMany(addTaskModels)
      const sut = makeSut()
      const tasks = await sut.loadAll(projectId, accountId)
      expect(tasks.length).toBe(2)
      expect(tasks[0].id).toBeTruthy()
      expect(tasks[0].name).toBe(addTaskModels[0].name)
      expect(tasks[1].name).toBe(addTaskModels[1].name)
    })

    test('Should load empty list', async () => {
      const accountId = await mockAccountId()
      const projectId = await mockProjectId(accountId)
      const sut = makeSut()
      const projects = await sut.loadAll(projectId, accountId)
      expect(projects.length).toBe(0)
    })
  })

  describe('upsert()', () => {
    test('Should upsert a task on success', async () => {
      const sut = makeSut()
      const accountId = await mockAccountId()
      const projectId = await mockProjectId(accountId)
      const taskId = await mockTaskId(projectId, accountId)
      await sut.upsert(taskId, mockAddTaskParams(projectId, accountId))
      const count = await projectCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('delete()', () => {
    test('Should delete a task on success', async () => {
      const sut = makeSut()
      const accountId = await mockAccountId()
      const projectId = await mockProjectId(accountId)
      const taskId = await mockTaskId(projectId, accountId)
      await sut.delete(taskId)
      const count = await projectCollection.countDocuments()
      expect(count).toBe(1)
    })
  })
})
