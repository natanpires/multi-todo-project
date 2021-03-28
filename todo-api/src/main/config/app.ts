import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupStaticFiles from './static-files'

import express from 'express'

const app = express()
setupStaticFiles(app)
setupMiddlewares(app)
setupRoutes(app)
export default app
