const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const cors = require('cors')

app.use(cors()) // ou seja, todo mundo pode consumir minha api e os recursos dela
io.on('connection', socket =>
{
    socket.on('connectRoom', box =>
    {
        socket.join(box)
    })
})

mongoose.connect('mongodb+srv://Emmanuel:n&ry123456@cluster0-pqrut.mongodb.net/test?retryWrites=true',{
    useNewUrlParser: true
})

app.use((req,res,next) =>
{
    req.io = io // cria uma variavel global io nas requisicoes
    return next() // pois nao tem resposta p cliente
})
// cadastra um modulo no express
app.use(express.json())
// permite envio de arquivos
app.use(express.urlencoded({extended: true}))
app.use('/files', express.static(path.resolve(__dirname,'..','tmp')))
app.use(require('./routes'))

http.listen(process.env.PORT || 9000, () => console.log('server on'))