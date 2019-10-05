const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = express.Router();
const upload = multer(uploadConfig);

//MVC = Models Views Controllers
//METODOS GET POST PUT  DELETE
//res.query acessa query para filtros
//res.params acessa route params (para edicao e delete)
//req.body acessar o corpo da requisicao (criacao, edicao)
routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.get('/dashboard', DashboardController.show);
routes.post('/spots', upload.single('thumbnail') ,SpotController.store);

routes.post('/spots/:spot_id/bookings',BookingController.store);

module.exports = routes;