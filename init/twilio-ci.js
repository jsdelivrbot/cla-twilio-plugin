var ci = require("cla/ci");

ci.createRole("Twilio");

ci.createClass("TwilioConfig", {
    icon: '/plugin/cla-twilio-plugin/icon/twilio.svg',
    form: '/plugin/cla-twilio-plugin/form/twilio-ci-form.js',
    roles: ["Twilio"],
    has: {
        userSid: {
            is: "rw",
            isa: "Str",
            required: true
        },
        authToken: {
            is: "rw",
            isa: "Str",
            required: true
        },
        responseUrl: {
            is: "rw",
            isa: "Str",
            required: true
        },
        twilioUrl: {
            is: "rw",
            isa: "Str",
            required: true
        },
        twilioNumber: {
            is: "rw",
            isa: "Str",
            required: true
        },
        destinationNumber: {
            is: "rw",
            isa: "Str",
            required: true
        }
    }

});
