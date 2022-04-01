# Exemplo de notificador com uso do Telegraf e com exemplo de integração via API Monday


Utiliza Docker e faz uso de 2 bancos de dados MySQL no projeto. 

A ideia é consultar em um dos bancos e no outro realizar o controle. 

Assim que identificar mensagem objetivo, envia uma notificação via Bot Telegram.



## Para rodar o projeto:

1 - [criar um bot usando o Telegram Bot father](https://core.telegram.org/bots)

2 - Criar um grupo no Telegram  e adicionar o bot criado no passo anterior

3 - Descobrir o ID do grupo chamando a seguinte api do telegram: `` https://api.telegram.org/bot<YourBOTToken>/getUpdates`` 

4 - Setar as variáveis de ambiente no docker-compose.yaml

5 - Podem ser setadas através do arquivo .env

6 - executar o comando a partir da raiz do projeto:
    ``
      docker-compose up --build
    ``
    
## Para enviar mensagens

Para simular um novo ciclo e efetuar novos envios de mensagem, pode adicionar um registro na tabela AUTCOM.VW_PEDIDOS_BAIXADOS_NAO_FATURADOS que é criada assim que o projeto é executado. Verifique o arquivo carga.sql que se encontra em db/init/citel

É possível também simular o envio de mensagem pelo Bot inserindo apenas na tabela teste.Mensagens.

Comando para efetuar o insert diretamente na tabela Mensagens:

  ``INSERT INTO Mensagens
(texto, enviado)
VALUES('Mensagem a ser enviada', 0);``

Obs: imporante verificar qual Banco de Dados quer trabalhar, pois há dois serviços MySQL. Um na porta padrão 3306, e outro na porta 3307. 
