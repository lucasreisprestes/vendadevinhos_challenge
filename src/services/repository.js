const api = require('axios');

module.exports = {

    async getDataApi(req,res,next) {

      const urlClient = 'http://www.mocky.io/v2/598b16291100004705515ec5';
      const urlHistory = 'http://www.mocky.io/v2/598b16861100004905515ec7';

      req.listClients = await api.get(urlClient);
      req.listHistory = await api.get(urlHistory);

      return next();
    }

}
