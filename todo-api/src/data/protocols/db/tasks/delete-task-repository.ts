export interface DeleteTaskRepository {
  delete: (taskId: string) => Promise<void>
}
