class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    console.log("Host em uso em Tabelas:", this.conexao.config.host);

    if (this.conexao.config.host == "db") this.criarMensagens();
    if (this.conexao.config.host == "citel") this.criarTabelasAutcomLocal();
  }

  criarMensagens() {
    const sql =
      "CREATE TABLE IF NOT EXISTS teste.Mensagens (id int DEFAULT 0, texto varchar(2048) NOT NULL, enviado BOOLEAN NOT NULL, PRIMARY KEY(id))";

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("Tabela Mensagens criada com sucesso");
      }
    });
  }

  criarTabelasAutcomLocal() {
    const sql =
      `CREATE TABLE IF NOT EXISTS COMERCIAL.VW_PEDIDOS_BAIXADOS_NAO_FATURADOS (
        NUMERO_PEDIDO varchar(12) NOT NULL,
        CODIGO_CLIENTE varchar(8) NOT NULL,
        NOME_CLIENTE varchar(60),
        TELEFONE_01 varchar(15),
        TELEFONE_02 varchar(15),
        CODIGO_VENDEDOR char(3) NOT NULL,
        VENDEDOR varchar(30) NOT NULL,
        EMPRESA char(3) NOT NULL,
        DATA_EMISSAO date,
        VALOR_PEDIDO decimal(12,2),
        DATA_BAIXA varchar(10),	
        OPERADOR varchar(3),
        PRIMARY KEY(NUMERO_PEDIDO)
      );`;

    const sql2 =
      `INSERT INTO AUTCOM.VW_PEDIDOS_BAIXADOS_NAO_FATURADOS
      VALUES 
      ('000000016063','10021743','ALAYR DAMAS SIQUEIRA','','33 24415448','18','EVERSON','16','2022-03-17',1667.05,'2022-03-17','255'),
      ('000000016084','16','CONSUMIDOR BALCAO','','','421','ABASTECIMENTO / ETIQUETA','16','2022-03-17',2466.00,'2022-03-18','999'),
      ('000000016036','10025437','JARDEL DA SILVA BEGNINI','33 987335512','33 998435532','72','CARLA COELHO','16','2022-03-17',131.03,'2022-03-18','999'),
      ('000000016088','16000168','MICHEL SILVA MENEGUELI','33 969745185','','174','MARVIN DE OLIVEIRA','16','2022-03-17',88.20,'2022-03-18','999')`;
      
    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
        console.log("Erro ao criar tabela VW_PEDIDOS_BAIXADOS_NAO_FATURADOS");
      } else {
        console.log("Tabela VW_PEDIDOS_BAIXADOS_NAO_FATURADOS criada com sucesso");
      }
    });

    this.conexao.query(sql2, (erro) => {
      if (erro) {
        console.log(erro);
        console.log("Erro ao inserir na tabela VW_PEDIDOS_BAIXADOS_NAO_FATURADOS");
      } else {
        console.log("INSERT de registro no COMERCIAL realizado com sucesso");
      }
    });    
  }  
}

module.exports = new Tabelas();
