const { Router } = require('express')
const TagsController = require('../controllers/TagsController')
var bodyparser = require('body-parser')

const TagsRouter = Router()
const tagsController = new TagsController()
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

TagsRouter.get('/:user_id',/* isAdmin, */bodyparser.json(),tagsController.index)

module.exports = TagsRouter