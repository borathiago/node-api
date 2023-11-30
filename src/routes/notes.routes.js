const { Router } = require('express')
const NotesController = require('../controllers/NotesController')
var bodyparser = require('body-parser')
const ensureAuth = require('../middlewares/ensureauth')

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

NotesRouter.use(bodyparser.json(),ensureAuth)

NotesRouter.post('/',/* isAdmin, */notesController.create)
NotesRouter.get('/:id',notesController.show)
NotesRouter.delete('/:id',notesController.delete)
NotesRouter.get('/',notesController.index)
/* NotesRouter.put('/:id',bodyparser.json(),usersController.update) */

module.exports = NotesRouter