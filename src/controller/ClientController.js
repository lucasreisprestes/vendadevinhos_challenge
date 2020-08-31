
module.exports = {

  async handleClientsHighestPurchaseValue( req, res ) {

    //pegar somente os dois ultimos dígitos
    const removerString = (str, i) => str.substr(str.length - i);

    let listClients = req.listClients.data;
    let listHistory = req.listHistory.data;

    const listaClientesTotalCompras = listClients.map( client  => {
      const codClient = removerString( client.cpf, 2 );

      const total = listHistory.reduce(( acumulador, item, indice, original ) => {

        if( codClient === removerString( item.cliente, 2 ) ) {
          return acumulador += item.valorTotal;
        }

        return acumulador;
      }, 0);

      return { nome: client.nome, totalCompras: total.toFixed( 2 ) };
    });

    const order = listaClientesTotalCompras.sort( function( a, b ) { return b.totalCompras - a.totalCompras } );
    return res.json( order );
  },

  async handleClientsBuyUniqueLastYear( req, res ) {
    //pegar somente os dois ultimos dígitos
    const removerString = (str, i) => str.substr(str.length - i);
    const listYear = (item, i, arr) => arr.indexOf( item ) === i;

    let listClients = req.listClients.data;
    let listHistory = req.listHistory.data;

    //Pegar somente o ano
    let year = listHistory.map( item => removerString( item.data, 4 ) );

    year = year.filter( listYear ).sort( function( a, b ) { a - b } );

    const listCustomersQtdShopping = listClients.map( client  => {
      const codClient = removerString( client.cpf, 2 );

      const qtdCompra = listHistory.reduce((cont, item, index, origial) => {

        if( codClient === removerString(item.cliente, 2) &&
            removerString(item.data, 4) === year[0] ) {

            cont = {
              nome: client.nome,
              cpf: client.cpf,
              codigo: client.codigo,
              data: item.data,
              qtdPurchase: item.itens.length,
              itens: item.itens,
            }
          return cont;
        }
        return cont;
      },0);

      return qtdCompra;

    });

    const order = listCustomersQtdShopping.sort( function( a, b) {
      return b.qtdPurchase - a.qtdPurchase
    });

    return res.json( order[0] );
  },

  async handleClientsLoyalCustomers( req, res ) {

    const removerString = ( str, i ) => str.substr( str.length - i );

    let listClients = req.listClients.data;
    let listHistory = req.listHistory.data;

    const listCustomersQtyShopping = listClients.map( client  => {
      const codClient = removerString( client.cpf, 2 );

      const qtdCompra = listHistory.reduce(( count, item, index, original ) => {

        if ( codClient === removerString( item.cliente, 2 ) ) {
          return count += 1;
        }

        return count;
      }, 0);

      return {
        nome: client.nome,
        cpf: client.cpf,
        qtdCompras: qtdCompra,
       };
    });

    const order = listCustomersQtyShopping.sort( function( a, b ) {
      return b.qtdCompras - a.qtdCompras
    });

    return res.json( order );
  },

  async handleShoppingSuggestion( req, res ) {

    const removerString = ( str, i ) => str.substr( str.length - i );

    let { cpf } =  req.query;
    let listClients = req.listClients.data;
    let listHistory = req.listHistory.data;

    const client = cpf
          ? listClients.filter(client => client.cpf.includes(cpf))
          : null;

    if(client.length <= 0){
      return res.status(400).json({error: "Cliente não encontrado!"});
    }

    //pegar os itens das compras do cliente
    const arraylistShopping = listHistory.reduce(( accumulator, item)  => {

        const codClient = removerString( item.cliente, 2 );

        if( removerString( cpf, 2) === codClient)
          accumulator.push(item.itens);

        return accumulator;
    }, accumulator =[]);

    const listShopping = [];
    for (var i = 0; i < arraylistShopping.length; i++) {
      for (var k = 0; k < arraylistShopping[i].length; k++) {
        listShopping.push(arraylistShopping[i][k]);
      }
    }

    //Número de ocorrências, para sugerir ao cliente
    const occurrences = listShopping.reduce(function(obj, item) {
      obj[item.produto] = (obj[item.produto] || 0) + 1;
      return obj;
    }, {});

    return res.json( occurrences );
  }

}
