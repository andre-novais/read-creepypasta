import { RequestHandler } from "ask-sdk-core";
import { IsIntent, getTopicLookupText, getTopicName } from "../utilities/helpers";
import { IntentTypes } from "../utilities/constants";
import * as Alexa from 'ask-sdk-core';
import aplDoc from '../documents/facts'
import * as personalizationUtil from '../personalizationUtil'

export const GetNewFactHandler: RequestHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      // checks request type
      return IsIntent(handlerInput, IntentTypes.GetNewFact)
    },
    async handle(handlerInput) {
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      //gets fact topic name
      var topicName = await getTopicName(handlerInput, requestAttributes);
      // gets a random fact by assigning an array to the variable
      // the random item from the array will be selected by the i18next library
      // the i18next library is set up in the Request Interceptor
      const randomFact = requestAttributes.t(getTopicLookupText(topicName, requestAttributes));
      const name = personalizationUtil.getPersonalizedPrompt(handlerInput);
      // concatenates a standard message with the random fact
      var speakOutput = ""
      if (name && name.length > 0) {
        speakOutput = requestAttributes.t('GET_FACT_MESSAGE_PERSONALIZED', name) + randomFact
      } else {
        speakOutput = requestAttributes.t('GET_FACT_MESSAGE', name) + randomFact
      }
      
       if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const datasource = {
              "factData": {
                  "backgroundImage": "https://d2o906d8ln7ui1.cloudfront.net/images/templates_v3/long_text/LongTextSampleBackground_Dark.png",
                  "title": requestAttributes.t('SKILL_NAME', requestAttributes.t(topicName)),
                  "primaryText": randomFact
              }
          }; 
          
          handlerInput.responseBuilder.addDirective(
          {
              type: "Alexa.Presentation.APL.RenderDocument",
              token: "facts",
              document: aplDoc,
              datasources: datasource
          });
       }
  
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(requestAttributes.t('HELP_REPROMPT'))
        .withSimpleCard(requestAttributes.t('SKILL_NAME', requestAttributes.t(topicName)), randomFact)
        .getResponse();
    },
  };