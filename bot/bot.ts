import TelegramBot from 'node-telegram-bot-api';

const token = '6895324536:AAHc4ul28qzrPbBU11q7dsDOcnIQNTb9lsg';
const bot = new TelegramBot(token, { polling: true });

const prefix = '-';
const webLink = 'https://main--fabulous-marshmallow-8a49ec.netlify.app/';

const regexPatterns = {
  help: new RegExp(`^${prefix}help$`),
  start: new RegExp(`^${prefix}start$`),
  ping: new RegExp(`^${prefix}ping$`),
  who: new RegExp(`^${prefix}who$`),
};

bot.onText(regexPatterns.help, (msg) => {
  bot.sendMessage(msg.chat.id, 'All commands:\n- help\n- start\n- ping\n- who');
});

bot.onText(regexPatterns.start, (msg) => {
  bot.sendChatAction(msg.chat.id, 'typing').then(() => {
    const welcomeMessage = `
Welcome to Hart Bot!

Please choose an option below:
`;

    const userId = msg.from.id;
    const link = `${webLink}?id=${userId}`;

    bot.sendMessage(msg.chat.id, welcomeMessage, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Open Webpage', web_app: { url: link } },
            { text: 'Ping', callback_data: 'ping' },
            { text: 'About Me', callback_data: 'about' },
          ],
        ],
      },
    });
  });
});

bot.on('callback_query', (query) => {
  const { message, data } = query;
  switch (data) {
    case 'ping':
      const start = Date.now();
      bot.answerCallbackQuery(query.id, 'Pinging...').then(() => {
        const end = Date.now();
        const rtt = end - start;
        bot.sendMessage(message.chat.id, `Pong! Round-trip time: ${rtt}ms`);
      });
      break;
    case 'about':
      bot.answerCallbackQuery(query.id, 'About me').then(() => {
        bot.sendMessage(
          message.chat.id,
          `I am a bot created by Saylendra Yasin`
        );
      });
      break;
    default:
      bot.answerCallbackQuery(query.id, 'Invalid option');
  }
});

bot.onText(regexPatterns.ping, (msg) => {
  const start = Date.now();
  bot.sendMessage(msg.chat.id, 'Pong!').then(() => {
    const end = Date.now();
    const rtt = end - start;
    bot.sendMessage(msg.chat.id, `Round-trip time: ${rtt}ms`);
  });
});

bot.onText(regexPatterns.who, (msg) => {
  bot.sendMessage(msg.chat.id, `I am a bot created by ${msg.from.first_name}`);
});

bot.on('polling_error', (error) => {
  console.error(error);
});

bot.on('webhook_error', (error) => {
  console.error(error);
});
