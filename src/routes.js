const express = require('express')
const routes = express.Router()
const BoxController = require('./controllers/boxController')
const FileController = require('./controllers/fileController')
const multer = require('multer')
const multerConfig = require('./config/multer')

routes.post('/boxes', BoxController.store)
routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store)
routes.get('/boxes/:id', BoxController.show)
module.exports =  routes