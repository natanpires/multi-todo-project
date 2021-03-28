export type TaskModel = {
  id: string
  projectId: string
  accountId: string
  taskId: string
  name: string
  isFinished?: boolean
  finishedAt?: Date
  date: Date
}
