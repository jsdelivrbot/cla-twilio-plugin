var reg = require('cla/reg');

reg.register('config.twilio', {
    name: 'Twilio configuration',
    metadata: [{
        id: 'baseUrl',
        label: 'Base URL',
        default: "https://{userSid}:{authToken}@api.twilio.com/2010-04-01/"
    }, {
        id: 'makeCall',
        label: 'Make call',
        default: "Accounts/{userSid}/Calls.json"
    }]
});


reg.register('service.twilio.call', {
    name: 'Twilio call',
    icon: '/plugin/cla-twilio-plugin/icon/twilio.svg',
    form: '/plugin/cla-twilio-plugin/form/twilio-call-form.js',
    handler: function(ctx, params) {
        var ci = require("cla/ci");
        var log = require('cla/log');
        var web = require("cla/web");
        var db = require("cla/db");
        var conf = require("cla/config");

        var agent = web.agent();
        var twilioCiMid = params.twilioCi || "";
        var topicData = ctx.stash("topic_data");
        var topicSelectedMid = topicData.mid;
        var correspondance = params.correspondance || "";

        var parameters = "";
        var topicCollection = db.getCollection("topic");
        var incident = topicCollection.findOne({
            mid: topicSelectedMid + ""
        });

        if (!incident) {
            log.fatal("Error, topic doesn't exist");
        }

        for (var key in correspondance) {
            parameters += key + "=" + encodeURI(incident[correspondance[key]]) + "&";
        }
        parameters = parameters.substring(0, parameters.length - 1);

        var twilioCi = ci.findOne({
            mid: twilioCiMid + ""
        });
        if (!twilioCi) {
            log.fatal("Twilio CI doesn't exist");
        }
        var userSid = twilioCi.userSid;
        var authToken = twilioCi.authToken;
        var templateUrl = twilioCi.responseUrl;
        var twilioNumber = "";
        var destinationNumber = "";

        if (params.defaultNumber) {
            twilioNumber = twilioCi.twilioNumber;
            destinationNumber = twilioCi.destinationNumber;
        } else {
            twilioNumber = params.twilioNumber;
            destinationNumber = params.destinationNumber;
        }

        if (userSid == "" || authToken == "" || twilioNumber == "" || destinationNumber == "" || templateUrl == "") {
            log.fatal("Missing fields in Twilio form")
        }
        var responseUrl = templateUrl + "?" + parameters;
        var mapObj = {
            userSid: userSid,
            authToken: authToken
        };
        var config = conf.get("config.twilio");
        var twilioUrl = config.baseUrl + config.makeCall;
        var valores = twilioUrl.match(/\{(.*?)\}/gi);

        var configHash = {};
        for (var i = 0; i < valores.length; i++) {
            configHash[valores[i]] = twilioCi[valores[i].substring(1, valores[i].length - 1)];
        }

        var replaceString = RegExp(valores.join("|"), "gi");
        var completeUrl = twilioUrl.replace(replaceString, function(matched) {
            return configHash[matched];
        });
        agent.postForm(completeUrl, {
            To: destinationNumber,
            From: twilioNumber,
            Url: responseUrl
        });

        log.info("Call done");

        return;
    }
});