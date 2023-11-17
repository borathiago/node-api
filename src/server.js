/* server.js é o ponto de entrada da nossa aplicação */
require('express-async-errors')
const migrations = require('./database/sqlite/migrations')
const AppError = require('./utils/AppError')
const express = require('express')
const routes = require('./routes')

migrations()
const app = express()
app.use(routes)
app.use(express.json())

app.use((error,request,response,next)=>{
    if(error instanceof AppError) {
        return response.status(error.statuscode).json({
            status: 'error',
            message: error.message
        })
    }
    console.error(error)
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

/* Request é a requisição que foi feita; por meio do Resquest podemos obter informações que são enviadas para a API */
/* Response é o recurso que posso utilizar para montar a resposta */
/* 
app.get('/',(request,response)=>{
    response.send('Ciao, mondo')
})
app.get('/message/:id',(request,response)=>{
    const { ID } = request.params
    response.send(`Ciao, ${ID}`)
})
app.get('/message/:id/:user',(request,response)=>{
    const { ID,user } = request.params
    response.send(`Ciao, ${ID}. Ti chiami ${user}?`)
}) 
*/

const PORT = 8765
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})