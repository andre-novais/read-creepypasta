import { RequestHandler } from "ask-sdk-core";
import { IsIntent } from "../utilities/helpers";


import aplDoc from '../documents/facts'
import * as personalizationUtil from '../personalizationUtil'

import * as personalizationStorageUtil from '../personalizationStorageUtil'

export const SetPersonalizedFactPreferencesHandler: RequestHandler = {
    canHandle(handlerInput) {
      return IsIntent(handlerInput,'AddNewFact')
    },
    async handle(handlerInput) {
      const currentIntent = (handlerInput.requestEnvelope.request as  any).intent;
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      var message = requestAttributes.t('ERROR_MESSAGE');
      if (currentIntent.slots.factType && currentIntent.slots.factType.value) {
        const factType = currentIntent.slots.factType.value;
        //persist new fact as personlized perference
        const persistenceConfirmation = await personalizationStorageUtil.savePreference(handlerInput, factType)
        //give back error message if personalization not enabled.
        message = persistenceConfirmation === undefined ? requestAttributes.t('PREFERENCE_ERROR') : (requestAttributes.t('CONFIRMATION_MESSAGE', personalizationUtil.getPersonalizedPrompt(handlerInput), factType))
      }
      return handlerInput.responseBuilder
        .speak(message)
        .reprompt(requestAttributes.t('HELP_REPROMPT'))
        .getResponse();
    },
  };