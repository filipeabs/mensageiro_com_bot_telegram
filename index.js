const conexao = require("./src/infraestrutura/conexao");
const conexao_ac = require("./src/infraestrutura/conexao_ac");
const Tabelas = require("./src/infraestrutura/tabelas");
const model = require("./src/persistencia/model");
const mensageiro = require("./src/mensageiro/mensageiro");

let continuar = true;
const mensagemIndex = [];

const executar = async () => {
  console.log("Iniciando....");
  await sleep(10000);

  conexao.connect((erro) => {
    if (erro) {
      console.log(conexao.config.host, "falhou: ", erro);
      throw erro;      
    } 
      console.log(">>STATUS ", conexao.state, "EM", conexao.config.host);
      Tabelas.init(conexao);
  });

  conexao_ac.connect((erro) => {
    if (erro) {
      console.log(conexao_ac.config.host, "falhou: ", erro);
      throw erro;      
    } 
      console.log(">>STATUS ", conexao_ac.state, "EM", conexao_ac.config.host);
      Tabelas.init(conexao_ac);
  }); 

  console.log("Mensageiro Funcionando");
  await sleep(10000);

  while (continuar) {
    await sleep(5000);
    
    console.log("Check CONEXOES:", conexao_ac.config.host, conexao_ac.state, "E", conexao.config.host, conexao.state);
    
    const whereClause1 = 'DATA_EMISSAO > curdate() - 7';
    model.consulta(conexao_ac, whereClause1, function(erro, res){
      if (erro) throw erro
      let cont = res.length;
      
      console.log('CONTROLLER:', cont);
      
      if (cont > 3) {cont = 3;} // USAR EM TESTE PARA ENVIAR POUCAS MENSAGENS
      
      for (let i = 0; i < cont; i++) {
        const inserirTexto = res[i] ;

        let texto = 'TESTE\n';
        texto = texto.concat('NUMERO DO PEDIDO: ', inserirTexto.NUMERO_PEDIDO,'\n');
        texto = texto.concat('COD DO CLIENTE: ',inserirTexto.CODIGO_CLIENTE,'\n');
        texto = texto.concat('NOME: ',inserirTexto.NOME_CLIENTE,'\n');
        //texto = texto.concat('TEL 01: ',inserirTexto.TELEFONE_01,'\n');
        //texto = texto.concat('TEL 02: ',inserirTexto.TELEFONE_02,'\n');
        texto = texto.concat('VENDEDOR: ',inserirTexto.VENDEDOR,'\n');
        //texto = texto.concat('COD DO VENDEDOR: ',inserirTexto.CODIGO_VENDEDOR,'\n');
        //texto = texto.concat('EMPRESA: ',inserirTexto.EMPRESA,'\n');
        texto = texto.concat('DATA DE EMISSAO: ',inserirTexto.DATA_EMISSAO,'\n');
        texto = texto.concat('VALOR DO PEDIDO: ',inserirTexto.VALOR_PEDIDO,'\n');
        texto = texto.concat('DATA DA BAIXA: ',inserirTexto.DATA_BAIXA,'\n');
        //texto = texto.concat('OPERADOR: ',inserirTexto.OPERADOR,'\n');
        texto = texto.concat('\nRegistre em [RezendeApp](https://)');
        console.log("TEXTO PARA ENVIO: ",texto);
        mensagemIndex[i] = parseInt(inserirTexto.NUMERO_PEDIDO);
        
        // Procedimento para nao inserir duplicado
        const columnId = mensagemIndex[i]; 
        let inserir = true;
        const whereClause2 = 'enviado is false or enviado is true';
        model.consulta(conexao, whereClause2, function(erro, ress){
          if (erro) throw erro
          for (let i = 0; i < ress.length; i++) {
            const mensagemEnviar = ress[i];
            if (mensagemEnviar.id === columnId){ inserir = false; }
          }
            if (inserir) {  
              model.insere(conexao, `${columnId}, '${texto}', 0`);
              //console.log("TEXTO PARA ENVIO: ",texto); 
            }
        });
        //if (inserir) { model.insere(conexao, `${mensagemIndex[i]}, '${texto}', 0`)};
      }
    });


    const whereClause2 = 'enviado is false';
    model.consulta(conexao, whereClause2, async function(erro, res){
      if (erro) throw erro
      let cont = res.length;

      console.log('CONTROLLER.2:', cont);

      if (cont > 2) cont = 2; // EM TESTE PARA ENVIAR POUCAS MENSAGENS
      
      for (let i = 0; i < cont; i++) {
        const mensagemEnviar = res[i];
        //console.log("texto", mensagemEnviar.texto);
        console.log("id", mensagemEnviar.id);
        
        let enviou = await mensageiro.enviarMesagem(mensagemEnviar.texto);
        
        if(mensagemEnviar.id==0){
          mensageiro.enviarNotificacaoMonday("TESTE DE NOTIFICACAO MENSAGEIRO");
          mensageiro.criarBoardMonday("Meu Board de Teste JS");
        }

        if (enviou.message_id) {
          const setUpdate  = 'enviado=1';
          const whereUpdate  = `id=${mensagemEnviar.id}`;
          model.atualiza(conexao, whereUpdate, setUpdate);  
        }
      }
    });
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

executar();
