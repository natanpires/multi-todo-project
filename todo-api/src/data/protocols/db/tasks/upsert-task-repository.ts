import { UpsertTask } from '@/domain/usecases'

export interface UpsertTaskRepository {
  upsert: (taskId: string, data: UpsertTaskRepository.Params) => Promise<void>
}

export namespace UpsertTaskRepository {
  export type Params = UpsertTask.Params
}
