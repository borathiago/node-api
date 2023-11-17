const { hash,compare } = require('bcrypt')
const AppError = require('../utils/AppError')
const SQLiteConnection = require('../database/sqlite')
class UsersController {
    async create(request,response) {
        const { name,email,password } = request.body
        const database = await SQLiteConnection()
        const checkUserExists = await database.get('select * from users where email = (?)',[email])
        if(checkUserExists) {
            throw new AppError('E-mail já cadastrado')
        }
        const hashedpassword = await hash(password,8)
        await database.run('insert into users (name,email,password) values (?,?,?)',[name,email,hashedpassword])
        return response.status(201).json()
        /* 
        if(!name) {
            throw new AppError('O nome é obrigatório')
        }
        response.status(201).json({ name,email,password }) 
        */
    }
    async update(request,response) {
        const {name,email,password,psswrd} = request.body
        const { id } = request.params
        const database = await SQLiteConnection()
        const user = await database.get('select * from users where id = (?)',[id])
        if(!user) {
            throw new AppError('Usuário não encontrado')
        }
        const emailExists = await database.get('select * from users where email = (?)',[email])
        if(emailExists&&emailExists.id!==user.id) {
            throw new AppError('Este e-mail não é seu e/ou já está em uso')
        }
        user.name = name ?? user.name
        user.email = email ?? user.email
        if(password&&!psswrd) {
            throw new AppError('Você precisa informar a senha antiga para definir a senha nova')
        }
        if(password&&psswrd) {
            const check = await compare(psswrd,user.password)
            if(!check) {
                throw new AppError('A senha antiga não confere')
            }
            user.password = await hash(password,8)
        }
        await database.run(`update users set name = ?,email = ?,password = ?,updated_at = datetime('now') where id = ?`,[user.name,user.email,user.password,id])
        return response.status(200).json()
    }
    /* index • GET • para listar vários registros */
    /* show • GET • para exibir um registro específico */
    /* create • POST • para criar um registro */
    /* update • PUT • para atualizar um registro */
    /* delete • PUT • para deletar um registro */
}

module.exports = UsersController