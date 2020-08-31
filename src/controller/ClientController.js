
module.exports = {

  async handleClientsHighestPurchaseValue(req, res) {

    //pegar somente os dois ultimos dígitos
    const removerString = (str, i) => str.substr( str.length - i );

    const listaClientesTotalCompras = req.litClients.data.map(client  => {
      const codClient = removerString( client.cpf, 2 );

      const total = req.litHistory.data.reduce((acumulador, item, indice, original) => {

        if( codClient === removerString(item.cliente, 2)) {
          return acumulador += item.valorTotal;
        }

        return acumulador;
      }, 0);

      return { nome: client.nome, totalCompras: total.toFixed(2) };
    });

    const order = listaClientesTotalCompras.sort(function(a,b) { return b.totalCompras - a.totalCompras;});
    return res.json(order);
  },

  async handleClientsCompraUnicaUltimoAno(req, res) {

    //pegar somente os dois ultimos dígitos
    const removerString = (str, i) => str.substr( str.length - i );
    const listYear = (este, i, arr) => arr.indexOf(este) === i;

    let litClients = req.litClients.data;
    let litHistory = req.litHistory.data;

    //Pegar somente o ano
    let year = litHistory.map(item => removerString(item.data, 4));
    year = year.filter(listYear).sort(function(a,b) {a - b});

    const listaClientesQtdCompras = litClients.map( client  => {

      const codClient = removerString( client.cpf, 2 );

      const qtdCompra = litHistory.reduce(( acumulador, item, indice, original ) => {

        const str = removerString(item.cliente, 2);

        if( codClient === removerString(item.cliente, 2) &&
            removerString(item.data, 4) === year[0])
        {

          return {
            nome: client.nome,
            cpf: client.cpf,
            codigo: client.codigo,
            data: client.data,
            codigo: item.codigo,
            data: item.data,
            qtdCompra: item.itens.length,
            itens: item.itens,
          }
        }

        return acumulador;
      }, 0);

      return qtdCompra;

    });

    const order = listaClientesQtdCompras.sort(function(a,b) { return b.qtdCompra - a.qtdCompra });
    return res.json(order);
  }

}
