const { Router } = require('express')
const NotesController = require('../controllers/NotesController')
var bodyparser = require('body-parser')

const NotesRouter = Router()
const notesController = new NotesController()
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

NotesRouter.post('/:user_id',/* isAdmin, */bodyparser.json(),notesController.create)
NotesRouter.get('/:id',bodyparser.json(),notesController.show)
NotesRouter.delete('/:id',bodyparser.json(),notesController.delete)
NotesRouter.get('/',bodyparser.json(),notesController.index)
/* NotesRouter.put('/:id',bodyparser.json(),usersController.update) */

module.exports = NotesRouter