const { Router, request } = require('express');
const ClientController = require('./controller/ClientController');
const routes = Router();


routes.get('/maiorvalorcompra', ClientController.handleClientsHighestPurchaseValue );

routes.get('/compraunica', ClientController.handleClientsCompraUnicaUltimoAno );

module.exports = routes;
