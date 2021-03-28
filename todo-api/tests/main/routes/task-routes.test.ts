import app from '@/main/config/app'
import env from '@/main/config/env'
import faker from 'faker'
import { MongoHelper } from '@/infra/db'

import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

let projectCollection: Collection
let accountCollection: Collection
let projectTasksCollection: Collection

const mockAccessToken = async (): Promise<Record<string, string>> => {
  const res = await accountCollection.insertOne({
    name: 'Natan',
    email: 'natan.souza@gmail.com',
    password: '123'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return { accessToken, id }
}

const mockProject = async (accountId: string): Promise<string> => {
  const res = await projectCollection.insertOne({
    name: 'Project Mock',
    accountId,
    projectId: faker.random.uuid(),
    date: new Date().toISOString()
  })
  return res.ops[0].projectId
}

const mockTask = async (projectId: string, accountId: string): Promise<string> => {
  const res = await projectTasksCollection.insertOne({
    name: 'Task Mock',
    accountId,
    projectId,
    taskId: faker.random.uuid(),
    isFinished: false,
    finishedAt: null,
    date: new Date().toISOString()
  })
  return res.ops[0].taskId
}

describe('Task Routes', () => {
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
    projectTasksCollection = await MongoHelper.getCollection('projectTasks')
    await projectTasksCollection.deleteMany({})
  })

  describe('POST /tasks', () => {
    test('Should return 403 on add task without accessToken', async () => {
      await request(app)
        .post('/api/tasks/' + faker.random.uuid())
        .send({
          name: 'Project X'
        })
        .expect(403)
    })

    test('Should return 204 on add task with valid accessToken', async () => {
      const { accessToken, id } = await mockAccessToken()
      const projectId = await mockProject(id)
      await request(app)
        .post('/api/tasks/' + projectId)
        .set('x-access-token', accessToken)
        .send({
          name: 'Task Mock 1',
          accountId: id,
          projectId,
          taskId: faker.random.uuid(),
          isFinished: false,
          finishedAt: null,
          date: new Date().toISOString()
        })
        .expect(204)
    })
  })

  describe('GET /tasks', () => {
    test('Should return 403 on load tasks without accessToken', async () => {
      await request(app)
        .get('/api/tasks/' + faker.random.uuid())
        .expect(403)
    })

    test('Should return 204 on load tasks with valid accessToken', async () => {
      const { accessToken, id } = await mockAccessToken()
      const projectId = await mockProject(id)
      const taskId = await mockTask(projectId, id)
      await request(app)
        .get('/api/tasks/' + taskId)
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('PUT /tasks/:id', () => {
    test('Should return 403 on upsert task without accessToken', async () => {
      await request(app)
        .put('/api/tasks/' + faker.random.uuid())
        .expect(403)
    })

    test('Should return 204 on upsert task with valid accessToken', async () => {
      const { accessToken, id } = await mockAccessToken()
      const projectId = await mockProject(id)
      const taskId = await mockTask(projectId, id)
      await request(app)
        .put('/api/tasks/' + taskId)
        .send({
          name: 'Task Mock 2'
        })
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('DELETE /tasks/:id', () => {
    test('Should return 403 on delete task without accessToken', async () => {
      await request(app)
        .delete('/api/tasks/' + faker.random.uuid())
        .expect(403)
    })

    test('Should return 204 on delete task with valid accessToken', async () => {
      const { accessToken, id } = await mockAccessToken()
      const projectId = await mockProject(id)
      const taskId = await mockTask(projectId, id)
      await request(app)
        .delete('/api/tasks/' + taskId)
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
