import express from 'express'
import ClassController from './controllers/ClassesController'

const routes = express.Router()
const classesControllers = new ClassController()

routes.get('/classes', classesControllers.index)
routes.post('/classes', classesControllers.create)

export default routes