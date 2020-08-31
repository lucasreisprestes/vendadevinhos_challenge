const api = require('axios');

module.exports = {

    async getDataApi(req,res,next) {

      const urlClient = 'http://www.mocky.io/v2/598b16291100004705515ec5';
      const urlHistory = 'http://www.mocky.io/v2/598b16861100004905515ec7';

      //if(!litClients.data)
      req.litClients = await api.get(urlClient);
      //if(!litHistory.data)
      req.litHistory = await api.get(urlHistory);
      //console.log('getDataApi ', res.litClients)

      return next();
    }

}
