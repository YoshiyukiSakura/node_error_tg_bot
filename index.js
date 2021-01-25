const readLastLines = require('read-last-lines');
const TelegramBot = require('node-telegram-bot-api');
const fs = require("fs");
const env = require('dotenv').config().parsed;

// replace the value below with the Telegram token you receive from @BotFather
const token = env.TOKEN;
var fileSize = 0;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'you chat id is: ' + chatId);
});

setInterval(async () => {
    var errors = await readLastLines.read(env.PATH, 5);
    var stats = fs.statSync(env.PATH)
    if (stats.size !== fileSize) {
        bot.sendMessage(env.XIN, 'a new error:' + errors);
    }
    fileSize = stats.size
}, 1000)