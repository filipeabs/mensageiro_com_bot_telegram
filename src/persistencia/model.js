function consulta (conexao, textoWhereClause, callback) {

    databaseDeConsulta = "teste.Mensagens";
    if (conexao.config.host == "com"){
        databaseDeConsulta = "COMERCIAL.VW_PEDIDOS_BAIXADOS_NAO_FATURADOS";
    }

    const sql1 = `SELECT * FROM ${databaseDeConsulta} WHERE ${textoWhereClause};`;
    console.log("sql1:", sql1);

    conexao.query(sql1, function (erro, resultado) {
        if (erro) {
            console.log("erro na consulta em ", conexao.config.host,":", erro);
            throw erro;
        } 
        console.log("dado da consulta em ", conexao.config.host , " retornado qtd:", resultado.length);
        callback(null, resultado);
    });
};

const insere = (conexao, valoresInserir) => {
    
    databaseParaInserir = 'teste.Mensagens';
    camposParaInserir = 'id, texto, enviado';

    if (conexao.config.host == "com"){
        databaseParaInserir = 'COMERCIAL.VW_PEDIDOS_BAIXADOS_NAO_FATURADOS';
        camposParaInserir = 'NUMERO_PEDIDO, CODIGO_CLIENTE, NOME_CLIENTE, TELEFONE_01, TELEFONE_02, CODIGO_VENDEDOR, VENDEDOR, EMPRESA, DATA_EMISSAO, VALOR_PEDIDO, DATA_BAIXA, OPERADOR';
    }

    const sql2 = `INSERT INTO ${databaseParaInserir} (${camposParaInserir}) VALUES (${valoresInserir});`;
    console.log("sql2:", sql2);

    conexao.query(sql2, (erro) => {
        if (erro) {
            console.log(erro);
            console.log("erro no INSERT em ", conexao.config.host);
        } else {
            console.log("INSERT de ", conexao.config.host , " OK");
        }
    });
}

const atualiza = (conexao, whereClause, setClause) => {

  databaseAtualizar = "teste.Mensagens";
  if (conexao.config.host == "com"){
    databaseAtualizar = "COMERCIAL.VW_PEDIDOS_BAIXADOS_NAO_FATURADOS";
  }

    const sql3 = `UPDATE  ${databaseAtualizar} SET ${setClause} WHERE ${whereClause};
    `;
    console.log("sql3:", sql3);

    conexao.query(sql3, async (erro, resultados) => {
      if (erro) {
        console.log(erro);
        console.log(conexao.config.host , " ", whereClause, " NAO atualizado");
      } else {
        console.log(conexao.config.host , " ", whereClause, " atualizado");
      }
    });
}

const deleta = (conexao, id) => {

    const sql4 = `DELETE FROM teste.Mensagens WHERE id=${id};
    `;
    conexao.query(sql4, async (erro, resultados) => {
      if (erro) {
        console.log(erro);
        console.log(conexao.config.host , " ", id, " NAO deletado");
      } else {
        console.log(conexao.config.host , " ", id, " deletado");
      }
    });
}

module.exports = {
    insere,
    consulta,
    atualiza,
    deleta
}