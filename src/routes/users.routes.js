const { Router } = require('express')
const UsersController = require('../controllers/UsersController')
var bodyparser = require('body-parser')

const UserRouter = Router()
const usersController = new UsersController()
/* 
function isAdmin(request,response,next) {
    console.log('Você passou pelo middleware')
    console.log(request.body)
    const { admin } = request.body
    if(!admin) {
        return response.json({message:'User unauthorized'})
    }
    next() A função do middleware que chama o destino
} 
*/

UserRouter.post('/',/* isAdmin, */bodyparser.json(),usersController.create)
UserRouter.put('/:id',bodyparser.json(),usersController.update)

module.exports = UserRouter