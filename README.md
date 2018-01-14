# Alexa Does It Fly Skill

## Introduction

This is an alexa skill based on the popular Indian folk game "Chidiya Udd", meaning, Does Bird Fly? with the purpose of helping kids learn which birds & animals can fly. It can also be used a a boilerplate for building other such quiz based alexa skills.

## [YouTube Demo](https://www.youtube.com/watch?v=M23cEWHVkOM)

## [A submission to Alexa Skills Challenge: Kids on Devpost](https://devpost.com/software/does-it-fly-chidiya-udd)

## How does it work?

### Workflow
You can test out this skill using an Amazon Echo device or at [Echosim](https://echosim.io). The workflow is as follows:
- You invoke the skill saying "Alexa, start does it fly."
- Alexa will ask you a question, and you have to tell whether the asked animal or bird or object flies or not. You have to respond with a Yes or No. 
- If you are able to answer all of them correctly, you win, else Alexa wins. If you respond incorrectly, you lose and Alexa will greet you with the asked animal's or bird's sound and tell you how many you got correctly.
- Alexa will also give you fun facts within the companion app about the asked animal along with the sound they make to continue the learning.
- And if you just want to know what sound does the animal makes, you can ask the skill for "What does the (animal's/bird's name) say" to hear the sound they make. If you want to hear any other animal's sound, ask again, or to start playing the "Does It Fly?" game just tell Alexa your name.

### Internal Implementation

- Create an Alexa Skill in the Alexa Skill Builder portal and define the interaction models as well as the intent schema. This sets up the framework for the behavior of the skill.
- Create an AWS Lambda function that interfaces with the Amazon Alexa and translates the various intents into requests that can be passed on. This lambda function is written in Node.js using [Alexa Skills Kit](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs). 

## How to get it up and running?

### Setting up Your Alexa Skill in the Developer Portal
To link it with your Amazon Echo Device, go to your [Amazon developer console](https://developer.amazon.com/edw/home.html#/skills).

1. Create a new skill. Call it `Does it Fly`. Give the invocation name as `does it fly`. Click next.

2. Click on the **Launch Skill Builder** (Beta) button . This will launch the new Skill Builder Dashboard. 

3. Click on the "Code Editor" item under **Dashboard** on the top left side of the skill builder.

4. In the textfield provided, replace any existing code with the code provided in the `speechAssets/intentSchema.json` and click on "Apply Changes" or "Save Model".

5. Click on the **Save Model** button, and then click on the **Build Model** button.

6. If your interaction model builds successfully, click on **Configuration button** to move on to Configuration. Now, we will be creating our Lambda function in the AWS developer console, but keep this browser tab open, because we will be returning here later.

### Setting Up A Lambda Function Using Amazon Web Services

1.  Go to http://aws.amazon.com and sign in to the console and choose the Lambda service from the search box. AWS Lambda only works with the Alexa Skills Kit in two regions: US East (N. Virginia) and EU (Ireland). Choose one of them.

2.  Click the "Create a Lambda function" button. Choose "Blueprints", then choose the blueprint named "alexa-skill-kit-sdk-factskill". And give your function a name.

3.  Set up your Lambda function role to "lambda_basic_execution" and click on Create Function. 

4. Configure your trigger. Look at the column on the left called "Add triggers", and select Alexa Skills Kit from the list. 

5. After you create the function, the ARN value appears in the top right corner. Copy this value for now.

6. Scroll down to the field called "Function code", and replace any existing code with the code provided in the `src/index.js`. Also make a new file in the same directory as index.js and name it data.js. Add the code given in `src/data.js` to it.

7. Make sure you've copied the ARN value. The ARN value should be in the top right corner. If you haven't already, copy this value for use in the next section.

### Connecting Your Voice User Interface To Your Lambda Function
  
1. Go back to the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list) and select your skill from the list.

2. Open the "Configuration" tab on the left side and select the "AWS Lambda ARN" option for your endpoint.

3. Select "North America" or "Europe" as your geographical region and Paste your Lambda's ARN (Amazon Resource Name) into the textbox provided.

4. Click Save and Next.

## Your Skill is Up and Running Now! You can test it on https://echosim.io 

## How to use it as a boilerplate?

The source code lies in the `src` directory. 

You might want to go through the [Alexa Skills Kit](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs) for further information.

## Support

If you happen to getstuck at any point, feel free to mail me at ashishjhaofficial@gmail.com. Also, if you find an error or a bug, please raise an issue [here](https://github.com/TheDreamSaver/alexa-does-it-fly).
