require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN; 

if (!token) {
  console.error('BOT_TOKEN is not defined in the environment variables!');
  process.exit(1);
}

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
    one_time_keyboard: false,
  },
};

const sendBotFatherInstructions = (chatId, action) => {
  const instructions = `To ${action}, use BotFather and follow the instructions.`;
  bot.sendMessage(chatId, instructions, mainMenuKeyboard);
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

// Send BotFather Instructions for different commands
bot.onText(/\/setname/, (msg) => sendBotFatherInstructions(msg.chat.id, "change the bot's name"));
bot.onText(/\/setdescription/, (msg) => sendBotFatherInstructions(msg.chat.id, "change the bot description"));
bot.onText(/\/setabouttext/, (msg) => sendBotFatherInstructions(msg.chat.id, "change the bot about info"));
bot.onText(/\/setuserpic/, (msg) => sendBotFatherInstructions(msg.chat.id, "change the bot profile photo"));
bot.onText(/\/setcommands/, (msg) => sendBotFatherInstructions(msg.chat.id, "change the bot commands"));
bot.onText(/\/deletebot/, (msg) => sendBotFatherInstructions(msg.chat.id, "delete your bot"));

bot.onText(/\/token/, (msg) => sendBotFatherInstructions(msg.chat.id, "generate an authorization token"));
bot.onText(/\/revoke/, (msg) => sendBotFatherInstructions(msg.chat.id, "revoke your bot's access token"));

bot.onText(/\/setinline/, (msg) => sendBotFatherInstructions(msg.chat.id, "toggle inline mode"));
bot.onText(/\/setinlinegeo/, (msg) => sendBotFatherInstructions(msg.chat.id, "toggle inline location requests"));
bot.onText(/\/setinlinefeedback/, (msg) => sendBotFatherInstructions(msg.chat.id, "change inline feedback settings"));
bot.onText(/\/setjoingroups/, (msg) => sendBotFatherInstructions(msg.chat.id, "allow your bot to be added to groups"));
bot.onText(/\/setprivacy/, (msg) => sendBotFatherInstructions(msg.chat.id, "toggle privacy mode in groups"));

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

// Handle user messages and prevent errors
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();
  
  if (!text.startsWith('/') && text.trim() !== '' && !['/start', '/help'].includes(text)) {
    bot.sendMessage(chatId, 'I\'m here to assist you with bot-related tasks. Please use the commands from the keyboard or type /help to get started.', mainMenuKeyboard);
  }
});

// Handling polling errors
bot.on('polling_error', (error) => {
  console.log('Polling error:', error);
  // Check if the error is due to a conflict and stop polling
  if (error.code === 'ETELEGRAM' && error.response.body.error_code === 409) {
    console.log('Polling conflict detected, stopping polling and switching to webhook...');
    bot.stopPolling();
    
    // Optional: Set up the webhook if needed
    // bot.setWebHook('https://your-server.com/path/to/receive/updates');
  }
});
