/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var Trello = require("node-trello");
var Q = require("q");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    stateEndpoint: process.env.BotStateEndpoint,
    openIdMetadata: process.env.BotOpenIdMetadata
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
 * Bot Storage: This is a great spot to register the private state storage for your bot. 
 * We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
 * For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
 * ---------------------------------------------------------------------------------------- */

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId || '6eab093b-8ec4-4e89-b9f5-7a54501262ee';
var luisAPIKey = process.env.LuisAPIKey || '5a09fa8d276b403f85b0c376ec784a5b';
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
console.log(recognizer)
var intents = new builder.IntentDialog({ recognizers: [recognizer] })
    .matches('AddCard', [
        function(session, args, next) {
            console.log("hello")
            session.send("Looks Like your trying to add a string");
        }
    ])
    .onDefault((session) => {
        session.send('Sorry, I did not understand \'%s\'.', session.message.text);
    });

bot.dialog('/', intents);