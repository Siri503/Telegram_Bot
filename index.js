require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN; 

const bot = new TelegramBot(token, { polling: true });

const mainMenuKeyboard = {
  reply_markup: {
    keyboard: [
      ['/newbot', '/mybots'],
      ['/setname', '/setdescription', '/setabouttext'],
      ['/setcommands', '/deletebot'],
      ['/token', '/revoke'],
      ['/setinline', '/setinlinegeo', '/setinlinefeedback'],
      ['/setjoingroups', '/setprivacy'],
      ['/myapps', '/newapp', '/listapps'],
      ['/mygames', '/newgame', '/listgames'],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello! I can help you create and manage Telegram bots. If you\'re new to the Bot API, please see the manual.\n\nYou can control me by sending these commands:', mainMenuKeyboard);
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'You can use the following commands to manage your bots and related services:\n/start - Start the bot\n/help - Get help\n/newbot - Create a new bot\n/mybots - Edit your bots\n... (list continues)', mainMenuKeyboard);
});

bot.onText(/\/newbot/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To create a new bot, follow the BotFather guide: https://core.telegram.org/bots#botfather');
});

bot.onText(/\/mybots/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'You can edit your bots through BotFather. For more details, visit: https://core.telegram.org/bots', mainMenuKeyboard);
});

bot.onText(/\/setname/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To change the bot\'s name, use BotFather and follow the instructions.');
});

bot.onText(/\/setdescription/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To change the bot description, use BotFather and follow the instructions.');
});

bot.onText(/\/setabouttext/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To change the bot about info, use BotFather and follow the instructions.');
});

bot.onText(/\/setuserpic/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To change the bot profile photo, use BotFather and follow the instructions.');
});

bot.onText(/\/setcommands/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To change the bot commands, use BotFather and follow the instructions.');
});

bot.onText(/\/deletebot/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To delete your bot, use BotFather and follow the instructions.');
});

// Handling Bot Settings commands
bot.onText(/\/token/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To generate an authorization token for your bot, use BotFather and follow the instructions.');
});

bot.onText(/\/revoke/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To revoke your bot\'s access token, use BotFather and follow the instructions.');
});

bot.onText(/\/setinline/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To toggle inline mode, use BotFather and follow the instructions.');
});

bot.onText(/\/setinlinegeo/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To toggle inline location requests, use BotFather and follow the instructions.');
});

bot.onText(/\/setinlinefeedback/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To change inline feedback settings, use BotFather and follow the instructions.');
});

bot.onText(/\/setjoingroups/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To allow your bot to be added to groups, use BotFather and follow the instructions.');
});

bot.onText(/\/setprivacy/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To toggle privacy mode in groups, use BotFather and follow the instructions.');
});

bot.onText(/\/myapps/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To manage your web apps, use the Telegram Bot API documentation.');
});

bot.onText(/\/newapp/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To create a new web app, refer to the Telegram Bot API documentation.');
});

bot.onText(/\/mygames/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To manage your games, refer to the Telegram Bot API documentation.');
});

bot.onText(/\/newgame/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'To create a new game, refer to the Telegram Bot API documentation.');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();
  
  if (!text.startsWith('/') && text.trim() !== '') {
    bot.sendMessage(chatId, 'I\'m here to assist you with bot-related tasks. Please use the commands from the keyboard or type /help to get started.', mainMenuKeyboard);
  }
});

bot.on('polling_error', (error) => {
  console.log('Polling error:', error);
});
