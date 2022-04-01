const { Telegraf } = require("telegraf");

exports.enviarMesagem = async (texto) => {
  const bot = new Telegraf(process.env.TELEGRAM_BOT_KEY);

  let mesagemEnviada = await bot.telegram.sendMessage(
    process.env.TELEGRAM_GROUP.toString(),
    texto
  );

  return mesagemEnviada;
};

exports.enviarNotificacaoMonday = async (texto) => {
  let query = `"mutation { create_notification (user_id: 11601455, target_id: 674387, text: \"${texto}\", target_type: project) { text } }"`;

  fetch ("https://api.monday.com/v2", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : process.env.MONDAY_API_KEY
     },
     body: JSON.stringify({
       query : query
     })
    })
     .then(res => res.json())
     .then(res => console.log(JSON.stringify(res, null, 2)));
};

exports.criarBoardMonday = async (texto) => {
  let query = `'mutation { create_board (board_name: \"${texto}\", board_kind: public) { id }}';`;

  fetch ("https://api.monday.com/v2", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : process.env.MONDAY_API_KEY
     },
     body: JSON.stringify({
       query : query
     })
    })
     .then(res => res.json())
     .then(res => console.log(JSON.stringify(res, null, 2)));
};
