const { Router } = require('express')
const UsersController = require('../controllers/UsersController')
const UserAvatarController = require('../controllers/UserAvatarController')
var bodyparser = require('body-parser')
const ensureAuth = require('../middlewares/ensureauth')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const UserRouter = Router()
const upload = multer(uploadConfig.MULTER)
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()
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

UserRouter.use(bodyparser.json())

UserRouter.post('/',/* isAdmin, */usersController.create)
UserRouter.put('/',ensureAuth,usersController.update)
UserRouter.patch('/avatar',ensureAuth,upload.single('avatar'),userAvatarController.update)

module.exports = UserRouter