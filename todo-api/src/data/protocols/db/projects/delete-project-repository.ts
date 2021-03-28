export interface DeleteProjectRepository {
  delete: (projectId: string) => Promise<void>
}
