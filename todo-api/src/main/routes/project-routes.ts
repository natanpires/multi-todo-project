import { adaptRoute } from '@/main/adapters'
import {
  makeAddProjectController,
  makeLoadProjectsController,
  makeDeleteProjectController,
  makeUpsertProjectController
} from '@/main/factories'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/projects', auth, adaptRoute(makeAddProjectController()))
  router.get('/projects', auth, adaptRoute(makeLoadProjectsController()))
  router.delete('/projects/:projectId', auth, adaptRoute(makeDeleteProjectController()))
  router.put('/projects/:projectId', auth, adaptRoute(makeUpsertProjectController()))
}
