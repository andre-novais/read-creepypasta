import { HandlerInput } from 'ask-sdk-core';
import { Lookups, RequestTypes, Topics } from './constants';
const personalizationStorageUtil = require('../personalizationStorageUtil')
/**
 * Checks if the request matches any of the given intents.
 *
 * @param handlerInput
 * @param intents
 */
export function IsIntent(
  handlerInput: HandlerInput,
  ...intents: string[]
): boolean {
  if (handlerInput.requestEnvelope.request.type === RequestTypes.Intent) {
    for (let i = 0; i < intents.length; i++) {
      if (handlerInput.requestEnvelope.request.intent.name === intents[i]) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Checks if the request matches any of the given types.
 *
 * @param handlerInput
 * @param types
 */
export function IsType(
  handlerInput: HandlerInput,
  ...types: string[]
): boolean {
  for (let i = 0; i < types.length; i++) {
    if (handlerInput.requestEnvelope.request.type === types[i]) {
      return true;
    }
  }
  return false;
}

export async function getTopicName(handlerInput: HandlerInput, requestAttributes) {
  const currentIntent = (handlerInput.requestEnvelope.request as any).intent;
  if (currentIntent && currentIntent.slots.factType && currentIntent.slots.factType.value) {
    console.log("inside current Intent " + currentIntent.slots.factType.value)
    return currentIntent.slots.factType.value;
  }
  return await personalizationStorageUtil.getPreferenceOrDefault(handlerInput, requestAttributes.t(Topics.DEFAULT_TOPIC));
}

export function getTopicLookupText(topicName: string, requestAttributes) {
  if (topicName) {
    switch (topicName.toString().toLowerCase()) {
      case requestAttributes.t(Topics.FOOTBALL).toLowerCase():
      case requestAttributes.t(Topics.SOCCER).toLowerCase():
        return Lookups.FOOTBALL_FACT_LOOKUP
      default:
        return Lookups.SPACE_FACT_LOOKUP;
    }
  }
  return Lookups.SPACE_FACT_LOOKUP;
}