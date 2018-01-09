"use strict";

var data = require('./data');
const OD = data.OD;
var AR = data.AR.slice();
var Alexa = require("alexa-sdk");
var APP_ID = "amzn1.ask.skill.f5a37364-328c-445a-9990-ade87337a490";


var handlers = {
   'LaunchRequest': function () {
    this.response.speak('<audio src="https://s3.amazonaws.com/doesitfly/bada_bing_bada_boom._TTH_.mp3"/> Welcome, to Does It Fly? What is your name?').listen("Ask for help if not sure what to do!"); 
    this.emit(":responseReady");
   },
   'NameIntent': function () {
       this.handler.state = "_DECISION";
       this.attributes.name = slotValue(this.event.request.intent.slots.myname);
       this.response.speak(`So ${this.attributes['name']}, Alexa will ask you a question, and you have to tell whether it flies or not. You have to respond with a Yes or No. Let's see how many you can answer correctly. Would you like to play?`).listen("Ask for help if not sure what to do!");
       this.emit(":responseReady");
   },
   'QuizIntent': function () {
       let outputspeech = "";
       if(this.attributes.score == 0){
           outputspeech += '<say-as interpret-as="interjection">all righty!</say-as>';
       }
       
       if(AR.length > 0 ) {
            this.attributes.randomizer = Math.floor(Math.random() * (AR.length-1));
            outputspeech += ` Does ${OD[AR[this.attributes.randomizer]].name} fly?`;
            var image = {
                    smallImageUrl: OD[AR[this.attributes.randomizer]].photoSmall,
                    largeImageUrl: OD[AR[this.attributes.randomizer]].photoBig
            };
            var cardTitle = OD[AR[this.attributes.randomizer]].name;
            var cardContent = OD[AR[this.attributes.randomizer]].fact;
       }
        
        
       
       this.response.speak(outputspeech).listen().cardRenderer(cardTitle, cardContent, image);
       this.emit(":responseReady");
   },

    'AMAZON.HelpIntent': function () {
        this.response.speak("Help").listen('Say ready!');
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak('I may be the one walking away, but you\'re the one that\'s leaving. Goodbye!');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        console.log("Stop Called");
        this.response.speak('I may be the one walking away, but you\'re the one that\'s leaving. Goodbye!');
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        console.log("SESSIONENDEDREQUEST");
        //this.attributes['endedSessionCount'] += 1;
        this.response.speak("Goodbye!");
        this.emit(':responseReady');
    },
    'Unhandled': function() {
        console.log("UNHANDLED");
        const message = 'I don\'t get it! Try saying Alexa, Open does it fly!';
        this.response.speak(message).listen(message);
        this.emit(':responseReady');
    }

};


var playHandlers = Alexa.CreateStateHandler("_PLAY", {
    'AMAZON.YesIntent': function () {
        if(OD[AR[this.attributes.randomizer]].fly == "yes"){
            AR.splice(this.attributes.randomizer,1);
            this.attributes.score += 1;
            if(AR.length == 0){
                this.handler.state = "_DECISION";
                this.response.speak(`Well done ${this.attributes.name}, You completed the game and scored ${this.attributes.score} points.`);
                this.emit(':responseReady');
            }
            this.emit('QuizIntent');
        }
        this.handler.state = "_DECISION";
        this.response.speak(`<say-as interpret-as="interjection">argh!</say-as> Wrong Answer. <audio src="${OD[AR[this.attributes.randomizer]].mp3}" /> A ${OD[AR[this.attributes.randomizer]].name} doesn't fly. You scored ${this.attributes.score} points.`).listen('Want to play again?');
        this.emit(':responseReady');
        
    },
    'AMAZON.NoIntent': function () {
        if(OD[AR[this.attributes.randomizer]].fly == "no"){
            AR.splice(this.attributes.randomizer,1);
            this.attributes.score += 1;
            if(AR.length == 0){
                this.handler.state = "_DECISION";
                this.response.speak(`Well done ${this.attributes.name}, You completed the game and scored ${this.attributes.score} points.`);
                this.emit(':responseReady');
            }
            this.emit('QuizIntent');
        }
        this.handler.state = "_DECISION";
        this.response.speak(`<say-as interpret-as="interjection">argh!</say-as> Wrong Answer. <audio src="${OD[AR[this.attributes.randomizer]].mp3}" /> A ${OD[AR[this.attributes.randomizer]].name} does fly. You scored ${this.attributes.score} points.`).listen('Want to play again?');
        this.emit(':responseReady');
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
        console.log("Stop Called");
        this.response.speak('I may be the one walking away, but you\'re the one that\'s leaving. Goodbye!');
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        console.log("SESSIONENDEDREQUEST");
        //this.attributes['endedSessionCount'] += 1;
        this.response.speak("Goodbye!");
        this.emit(':responseReady');
    },
    'Unhandled': function() {
        console.log("UNHANDLED");
        const message = 'I don\'t get it! Try saying Alexa, Open does it fly!';
        this.response.speak(message).listen(message);
        this.emit(':responseReady');
    }
});

var decisionHandlers = Alexa.CreateStateHandler("_DECISION", {
    'AMAZON.YesIntent': function () {
        AR = data.AR.slice();
        this.handler.state = "_PLAY";
        this.attributes.score = 0;
        this.emit('QuizIntent');
    },
    'AMAZON.NoIntent': function () {
        this.response.speak('<say-as interpret-as="interjection">argh!</say-as> We could have had a fun day together!');
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
        console.log("Stop Called");
        this.response.speak('I may be the one walking away, but you\'re the one that\'s leaving. Goodbye!');
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        console.log("SESSIONENDEDREQUEST");
        //this.attributes['endedSessionCount'] += 1;
        this.response.speak("Goodbye!");
        this.emit(':responseReady');
    },
    'Unhandled': function() {
        console.log("UNHANDLED");
        const message = 'I don\'t get it! Try saying Alexa, Open does it fly!';
        this.response.speak(message).listen(message);
        this.emit(':responseReady');
    }
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
