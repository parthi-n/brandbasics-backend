// watsonService.js
const { IamAuthenticator } = require("ibm-watson/auth");
const AssistantV2 = require("ibm-watson/assistant/v2");
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");

require("dotenv").config();

// Watson Assistant Setup
const assistant = new AssistantV2({
	version: "2021-11-27",
	authenticator: new IamAuthenticator({
		apikey: process.env.WATSON_ASSISTANT_APIKEY,
	}),
	serviceUrl: process.env.WATSON_ASSISTANT_URL,
	disableSslVerification: true,
});

// Watson NLU Setup
const nlu = new NaturalLanguageUnderstandingV1({
	version: "2021-08-01",
	authenticator: new IamAuthenticator({
		apikey: process.env.WATSON_NLU_APIKEY,
	}),
	serviceUrl: process.env.WATSON_NLU_URL,
});

module.exports = { assistant, nlu };
