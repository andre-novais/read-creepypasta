import * as Alexa from 'ask-sdk-core';
import { Launch } from './intents/Launch';
import { Help } from './intents/Help';
import { Stop } from './intents/Stop';
import { Reflector } from './intents/Reflector';
import { Fallback } from './intents/Fallback';
import { HelloWorld } from './intents/HelloWorld';
import { ErrorProcessor } from './errors/ErrorProcessor';
import { SessionEnded } from './intents/SessionEnded';
import { LocalizationRequestInterceptor } from './interceptors/LocalizationRequestInterceptor';
import { GetNewFactHandler } from './intents/GetNewFact';
import { SetPersonalizedFactPreferencesHandler } from './intents/SetPersonalizedFactPreferences';

export const handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    // Default intents
    Launch,
    HelloWorld,
    Help,
    Stop,
    SessionEnded,
    Reflector,
    Fallback,
    GetNewFactHandler,
    SetPersonalizedFactPreferencesHandler
  )
  .addErrorHandlers(ErrorProcessor)
  .addRequestInterceptors(LocalizationRequestInterceptor)
  .lambda();
