const { Router } = require('express');
const ClientController = require('./controller/ClientController');
const routes = Router();


routes.get('/maiorvalorcompra', ClientController.handleClientsHighestPurchaseValue );

routes.get('/compraunica', ClientController.handleClientsBuyUniqueLastYear );

routes.get('/fieis', ClientController.handleClientsLoyalCustomers);

routes.get('/sugestao', ClientController.handleShoppingSuggestion);


module.exports = routes;
