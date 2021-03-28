import app from '@/main/config/app'
import env from '@/main/config/env'
import faker from 'faker'
import { MongoHelper } from '@/infra/db'

import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

let projectCollection: Collection
let accountCollection: Collection

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

describe('Project Routes', () => {
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

  describe('POST /projects', () => {
    test('Should return 403 on add project without accessToken', async () => {
      await request(app)
        .post('/api/projects')
        .send({
          name: 'Project X'
        })
        .expect(403)
    })

    test('Should return 204 on add project with valid accessToken', async () => {
      const { accessToken } = await mockAccessToken()
      await request(app)
        .post('/api/projects')
        .set('x-access-token', accessToken)
        .send({
          name: 'Project X'
        })
        .expect(204)
    })
  })

  describe('GET /projects', () => {
    test('Should return 403 on load projects without accessToken', async () => {
      await request(app)
        .get('/api/projects')
        .expect(403)
    })

    test('Should return 204 on load projects with valid accessToken', async () => {
      const { accessToken } = await mockAccessToken()
      await request(app)
        .get('/api/projects')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('PUT /projects/:id', () => {
    test('Should return 403 on upsert project without accessToken', async () => {
      await request(app)
        .put('/api/projects/' + faker.random.uuid())
        .expect(403)
    })

    test('Should return 204 on upsert project with valid accessToken', async () => {
      const { accessToken, id } = await mockAccessToken()
      const projectId = await mockProject(id)
      await request(app)
        .put('/api/projects/' + projectId)
        .send({
          name: 'Project Mock 2'
        })
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('DELETE /projects/:id', () => {
    test('Should return 403 on delete project without accessToken', async () => {
      await request(app)
        .delete('/api/projects/' + faker.random.uuid())
        .expect(403)
    })

    test('Should return 204 on delete project with valid accessToken', async () => {
      const { accessToken, id } = await mockAccessToken()
      const projectId = await mockProject(id)
      await request(app)
        .delete('/api/projects/' + projectId)
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
