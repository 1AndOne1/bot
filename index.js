const TelegramBot = require('node-telegram-bot-api')


const token = '7156035988:AAE43NDXwQucFyLnHfUXLNWIHdekbFRCNAM'

const bot = new TelegramBot(token, {polling: true})

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const first_name = msg.chat.first_name;
  
    if (msg.text) {
  
      const text = msg.text.toLowerCase();
  
      if (~text.indexOf("привет")) {  
        bot.sendMessage(chatId, 'Привет,' + first_name + '!');
      } else if (~text.indexOf("start")) {
      } else if (~text.indexOf("закрыть")) {
        bot.sendMessage(chatId, 'Клавиатура закрыта', {
          reply_markup: {
            remove_keyboard: true
          }
        });
      } else if (~text.indexOf("клав")) {
        openKlava(chatId);
      } else if (~text.indexOf('парс')) {
        parsingStr(chatId)
      }
     else if (~text.indexOf("здравст")) {
        bot.sendMessage(chatId, 'Здравствуй,' + first_name + '!');
      } else if (~text.indexOf("парсинг")) {
        bot.sendMessage(chatId, 'запарсить странцу', {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Парсинг',
                  callback_data: 'parse'
                }
              ]
            ]
          }  
        })
      } else {
        bot.sendMessage(chatId, 'ошибка');
      }
    }
  
    bot.forwardMessage(chatId, msg.message_id);
  });
  bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Приветик, ' + msg.chat.first_name + '!');
    openKlava(chatId, first_name);
  });

  bot.on('parse', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Введите ссылку страницы');
  });

  function openKlava(chatId) {
    bot.sendMessage(chatId, 'Клавиатура открыта', {
     reply_markup: {
       keyboard: [
         [
           {
             text: 'Запарсить страницу'
           }, {
             text: 'Закрыть'
           }
         ]     
       ],
       one_time_keyboard: true
     }  
   }) 
 }

 bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    if (query.data === 'parse') {
      parsingStr(chatId, query.message.chat.first_name);
    } 
  });

  function parsingStr(chatId, first_name) {
    fs.readdir('./klasik/', function(err,files) {
      const rf = files[Math.floor(Math.random()*files.length)];
      bot.sendMessage(chatId, '' + first_name + ', лови классическую музыку!');
      bot.sendAudio(chatId, './klasik/' + rf).then(()=>{
        bot.sendMessage(chatId, 'И слушай!');
      });  
    })  
  }