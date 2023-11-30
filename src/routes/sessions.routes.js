const { Router } = require('express')
const SessionsController = require('../controllers/SessionsController')
var bodyparser = require('body-parser')

const sessionRouter = Router()
const sessionscontroller = new SessionsController()

sessionRouter.post('/',bodyparser.json(),sessionscontroller.create)

module.exports = sessionRouter