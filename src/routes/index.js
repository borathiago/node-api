const { Router } = require('express')
const UserRouter = require('./users.routes.js')
const NotesRouter = require('./notes.routes.js')
const TagsRouter = require('./notes.routes.js')
const routes = Router()
routes.use('/users',UserRouter)
routes.use('/notes',NotesRouter)
routes.use('/tags',TagsRouter)
module.exports = routes