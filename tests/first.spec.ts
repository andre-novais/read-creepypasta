
const va = require("virtual-alexa");
const _defaultHandler = va.VirtualAlexa.Builder()
          .handler("./build/lambda/index.js") // Lambda file
          .interactionModelFile("./interactionModels/custom/en-US.json") // Interaction file
          .locale("en-US")
          .create();

describe("get creepypasta list", () => {
    it("works", () => {
        
        
        
        _defaultHandler.intend("GetNewFactIntent").then((payload) => {
        // // Print speech to console
        //   console.log("OutputSpeech: " + payload.response.outputSpeech.ssml);
          
        expect(payload.response.outputSpeech.ssml).toBe("<speak>REFLECTOR_MSG</speak>")
        });
    })

    it("reads a random creepypasta", () => {
        _defaultHandler.intend('ReadCreepyPasta').then((payload) => {              
            const containsSub = (payload.response.outputSpeech.ssml as string).includes("This is not copypasta, this is a long read")

            expect(containsSub).toBeTruthy()
    })})
})