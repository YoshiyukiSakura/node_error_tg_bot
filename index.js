const readLastLines = require('read-last-lines');
const TelegramBot = require('node-telegram-bot-api');
var fs = require("fs");
var file_name = '/Users/yoshiyuki/.pm2/logs/bot-error.log';

// replace the value below with the Telegram token you receive from @BotFather
const token = '1344715225:AAEWx-Yw6n0VlPrQ1TtaQeLjDCOgtfjuzEI';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

var fileSize = 0;
const xin = 790317226;
// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'you chat id is: ' + chatId);
});

setInterval(async () => {
    var errors = await readLastLines.read(file_name, 5);
    var stats = fs.statSync(file_name)
    if (stats.size !== fileSize) {
        bot.sendMessage(xin, 'a new error:' + errors);
    }
    fileSize = stats.size
}, 1000)