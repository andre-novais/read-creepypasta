const va = require("virtual-alexa");
const _defaultHandler = va.VirtualAlexa.Builder()
  .handler("./build/lambda/index.js") // Lambda file
  .interactionModelFile("./interactionModels/custom/en-US.json") // Interaction file
  .locale("en-US")
  .create();


_defaultHandler.intend("GetNewFactIntent").then((payload) => {
// Print speech to console
  console.log("OutputSpeech: " + payload.response.outputSpeech.ssml);
});