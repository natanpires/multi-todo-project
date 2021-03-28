import { MongoHelper, QueryBuilder } from '@/infra/db'
import {
  AddProjectRepository,
  LoadProjectsRepository,
  UpsertProjectRepository,
  DeleteProjectRepository
} from '@/data/protocols/db'

import { ObjectId } from 'mongodb'

export class ProjectMongoRepository implements
    AddProjectRepository,
    LoadProjectsRepository,
    UpsertProjectRepository,
    DeleteProjectRepository {
  async add (data: AddProjectRepository.Params): Promise<void> {
    const projectCollection = await MongoHelper.getCollection('projects')
    await projectCollection.insertOne(data)
  }

  async loadAll (accountId: string): Promise<LoadProjectsRepository.Result> {
    const projectCollection = await MongoHelper.getCollection('projects')
    const query = new QueryBuilder()
      .lookup({
        from: 'projectTasks',
        foreignField: 'projectId',
        localField: 'projectId',
        as: 'tasks'
      })
      .match({ accountId: new ObjectId(accountId) })
      .build()

    const projects = await projectCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(projects)
  }

  async upsert (projectId: string, data: UpsertProjectRepository.Params): Promise<void> {
    const projectCollection = await MongoHelper.getCollection('projects')
    await projectCollection.updateOne(
      {
        projectId
      },
      {
        $set: data
      }
    )
  }

  async delete (projectId: string): Promise<void> {
    const [projectCollection, taskCollection] = await Promise.all([
      MongoHelper.getCollection('projects'),
      MongoHelper.getCollection('projectTasks')
    ])
    await taskCollection.deleteMany({ projectId }).catch()
    await projectCollection.deleteOne({ projectId })
  }
}
