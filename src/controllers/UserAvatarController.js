const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')
class UserAvatarController {
    async update(request,response) {
        const user_id = request.user.id
        const avatarFileName = request.file.filename
        const storage = new DiskStorage()
        const user = await knex('users').where({id:user_id}).first()
        if(!user) {
            throw new AppError('Somente usuários autenticados podem trocar a imagem de perfil')
        }
        if(user.avatar) {
            await storage.deleteFile(user.avatar)
        }
        const filename = await storage.saveFile(avatarFileName)
        user.avatar = filename
        await knex('users').update(user).where({id:user_id})
        return response.status(200).json(user)
    }
}

module.exports = UserAvatarController