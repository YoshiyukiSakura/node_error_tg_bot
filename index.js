const readLastLines = require('read-last-lines');
const TelegramBot = require('node-telegram-bot-api');
const fs = require("fs");
const env = require('dotenv').config().parsed;

// replace the value below with the Telegram token you receive from @BotFather
const token = env.TOKEN;
var fileSizeApi = 0;
var fileSizeTrack = 0;
var fileSizeCallback = 0;
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
    var errors = await readLastLines.read(env.PATH_ZERO_CONF, 5);
    var stats = fs.statSync(env.PATH)
    if (stats.size !== fileSizeApi) {
        bot.sendMessage(env.XIN, 'zero_conf api new error:' + errors);
    }
    fileSizeApi = stats.size
}, 1000)

setInterval(async () => {
    var errors = await readLastLines.read(env.PATH_TRACK, 5);
    var stats = fs.statSync(env.PATH)
    if (stats.size !== fileSizeTrack) {
        bot.sendMessage(env.XIN, 'zero_conf tracker new error:' + errors);
    }
    fileSizeTrack = stats.size
}, 1000)

setInterval(async () => {
    var errors = await readLastLines.read(env.PATH_CALLBACK, 5);
    var stats = fs.statSync(env.PATH)
    if (stats.size !== fileSizeCallback) {
        bot.sendMessage(env.XIN, 'zero_conf callback new error:' + errors);
    }
    fileSizeCallback = stats.size
}, 1000)