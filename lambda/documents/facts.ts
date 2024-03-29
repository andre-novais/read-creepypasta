export default {
    "type": "APL",
    "version": "2022.1",
    "license": "Copyright 2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.\nSPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0\nLicensed under the Amazon Software License  http://aws.amazon.com/asl/",
    "theme": "dark",
    "settings": {
        "supportsResizing": true,
        "idleTimeout": 300000
    },
    "onConfigChange": {
        "type": "Reinflate",
        "description": "This command reinflates the entire document when screen characteristics change fundamentally i.e. user rotates device to switch from landscape to portrait mode and vice versa."
    },
    "import": [{
        "name": "alexa-layouts",
        "version": "1.5.0"
    }],
    "mainTemplate": {
        "parameters": [
            "factData"
        ],
        "item": [{
            "type": "Container",
            "height": "100vh",
            "width": "100vw",
            "items": [{
                    "type": "AlexaBackground",
                    "backgroundImageSource": "${factData.backgroundImage}"
                },
                {
                    "type": "AlexaHeader",
                    "headerTitle": "${factData.title}",
                    "headerDivider": false
                },
                {
                    "type": "ScrollView",
                    "grow": 1,
                    "paddingTop": "@spacingMedium",
                    "paddingLeft": "@marginHorizontal",
                    "paddingRight": "@marginHorizontal",
                    "items": [{
                        "type": "Text",
                        "style": "textStyleDisplay4",
                        "text": "${factData.primaryText}"
                    }]
                }
            ]
        }]
    }
}