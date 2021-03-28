import { MongoHelper } from '@/infra/db'
import {
  AddTaskRepository,
  LoadTasksRepository,
  UpsertTaskRepository,
  DeleteTaskRepository
} from '@/data/protocols/db'

import { ObjectId } from 'mongodb'

export class TaskMongoRepository implements
  AddTaskRepository,
  LoadTasksRepository,
  UpsertTaskRepository,
  DeleteTaskRepository {
  async add (data: AddTaskRepository.Params): Promise<void> {
    const taskCollection = await MongoHelper.getCollection('projectTasks')
    await taskCollection.insertOne(data)
  }

  async loadAll (projectId: string, accountId: string): Promise<LoadTasksRepository.Result> {
    const taskCollection = await MongoHelper.getCollection('projectTasks')
    const tasks = await taskCollection
      .find({
        projectId,
        accountId: new ObjectId(accountId)
      })
      .toArray()
    return MongoHelper.mapCollection(tasks)
  }

  async upsert (taskId: string, data: UpsertTaskRepository.Params): Promise<void> {
    const taskCollection = await MongoHelper.getCollection('projectTasks')
    await taskCollection.updateOne(
      {
        taskId
      },
      {
        $set: data
      }
    )
  }

  async delete (taskId: string): Promise<void> {
    const projectCollection = await MongoHelper.getCollection('projectTasks')
    await projectCollection.deleteOne({ taskId })
  }
}
