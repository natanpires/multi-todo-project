import { adaptRoute } from '@/main/adapters'
import {
  makeAddTaskController,
  makeLoadTasksController,
  makeUpsertTaskController,
  makeDeleteTaskController
} from '@/main/factories'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/tasks/:projectId', auth, adaptRoute(makeAddTaskController()))
  router.get('/tasks/:taskId', auth, adaptRoute(makeLoadTasksController()))
  router.put('/tasks/:taskId', auth, adaptRoute(makeUpsertTaskController()))
  router.delete('/tasks/:taskId', auth, adaptRoute(makeDeleteTaskController()))
}
