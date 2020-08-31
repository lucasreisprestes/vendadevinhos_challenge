const express = require('express');
const app = express();
const cors= require('cors');
const routes = require('./routes');
const repository = require('./services/repository');

app.use(express.json());
app.use(cors());
app.use(repository.getDataApi);

app.use(routes);

app.listen(3000, () =>{
    console.log('🚀 Started! port 3000');
})
