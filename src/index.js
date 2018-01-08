"use strict";

var data = require('./data');
const OD = data.OD;
var Alexa = require("alexa-sdk");
var APP_ID = "amzn1.ask.skill.f5a37364-328c-445a-9990-ade87337a490";


var handlers = {
    'UnhandledIntent': function () {
        this.emit(':ask', 'I don\'t get it! Try saying Alexa, Open does it fly!', 'I don\'t get it! Try saying Alexa, Open does it fly!');
    },
   'LaunchRequest': function () {
    this.response.speak('<audio src="https://s3.amazonaws.com/doesitfly/bada_bing_bada_boom._TTH_.mp3"/> Welcome, to Does It Fly? What is your name?.').listen("Ask for help if not sure what to do!"); 
    this.emit(":responseReady");
   },
   'NameIntent': function () {
       this.handler.state = "_DECISION";
       this.attributes['name'] = slotValue(this.event.request.intent.slots.myname);
       this.response.speak(`So ${this.attributes['name']}, Alexa will ask you a question, and you have to tell whether it flies or not. You have to respond with a Yes or No. Let's see how many you can answer correctly. Would you like to play?`).listen("Ask for help if not sure what to do!");
       this.emit(":responseReady");
   },
   'QuizIntent': function () {
       let outputspeech = '<say-as interpret-as="interjection">all righty!</say-as>';
       
       outputspeech += ` Does ${OD[Math.floor(Math.random() * (OD.length-1))].name} fly?`;
       
       
       
       
       this.response.speak(outputspeech).listen();
       this.emit(":responseReady");
   },

    'AMAZON.HelpIntent': function () {
        this.response.speak("Help").listen(' Say ready!');
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak('I may be the one walking away, but you\'re the one that\'s leaving. Goodbye!');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak('I may be the one walking away, but you\'re the one that\'s leaving. Goodbye!');
        this.emit(':responseReady');
    },

};


var playHandlers = Alexa.CreateStateHandler("_PLAY", {
    'AMAZON.YesIntent': function () {
        this.emit('QuizIntent');
    },
    'AMAZON.NoIntent': function () {
        this.response.speak('<say-as interpret-as="interjection">argh!</say-as>');
        this.emit(":responseReady");
    },
});

var decisionHandlers = Alexa.CreateStateHandler("_DECISION", {
    'AMAZON.YesIntent': function () {
        this.handler.state = "_PLAY";
        this.emit('QuizIntent');
    },
    'AMAZON.NoIntent': function () {
        this.response.speak('<say-as interpret-as="interjection">argh!</say-as> We could have had a fun day together!');
        this.emit(":responseReady");
    },
});




function slotValue(slot, useId){
    let value = slot.value;
    let resolution = (slot.resolutions && slot.resolutions.resolutionsPerAuthority && slot.resolutions.resolutionsPerAuthority.length > 0) ? slot.resolutions.resolutionsPerAuthority[0] : null;
    if(resolution && resolution.status.code == 'ER_SUCCESS_MATCH'){
        let resolutionValue = resolution.values[0].value;
        value = resolutionValue.id && useId ? resolutionValue.id : resolutionValue.name;
    }
    return value;
}

// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {

// Set up the Alexa object
var alexa = Alexa.handler(event, context); 
alexa.appId = APP_ID;

// Register Handlers
alexa.registerHandlers(handlers, playHandlers, decisionHandlers); 

// Start our Alexa code
alexa.execute(); 
  
};
