# Twilio call plugin

Twilio plugin will allow you to create calls from Twilio API remotely from a Clarive instance.

## What is Twilio

Twilio is a cloud communications platform as a service company based in San Francisco, California. Twilio allows software developers to programmatically make and receive phone calls and send and receive text messages using its web service APIs.

## Requirements

There are no requirements outlined in Clarive in order to work with this plugin.

## Installation

To install the plugin, place the cla-twilio-plugin folder inside the `CLARIVE_BASE/plugins`
directory in a Clarive instance.

## How to use

Once the plugin is correctly installed and Clarive restarted, you will have a new palette service called 'Twilio call', and a new CI for Twilio configuration, called 'TwilioConfig'.

It also will create two new variables in Clarive's config list for the main Twilio URL and the Twilio API URL designed to make the calls.

### Clarive config list

The variables created by the plugin are:
- **config.twilio.baseUrl** - With a default value, where names between '${}' are the variables to get from the TwilioConfig CI
- **config.twilio.makeCall** - With a default value, where names between '${}' are the variables to get from the TwilioConfig CI

### TwilioConfig CI:

You will be able to save your configuration for the Twilio API in this CI. The main fields are:

- **User SID** - User ID to be able to launch remote commands.
- **Authentication token** - User token to be able to launch remote commands.
- **Response URL** - URL for the xml code That Twilio API needs to read the topic. See the xml Configuration to know the fields it needs.
- **Twilio number** - The phone number Twilio will use to make the call. It must include country prefix.
- **Destination number** - The phone number the Twilio API must call. It must include country prefix.

Configuration example:

    User SID: asDEFFdds4t3242Rrf245e2r
    Authentication Token: werr2rfRF4t3trRERG34
    Response URL: https://myresponse.com/responseForTheCode
    Twilio number: +34666555777
    Destination number: +34777666555


### Twilio call:

This palette service will let you configure you Twilio settings and the data you want to send.
The main fields are:

- **Twilio CI** - Select the CI with the user and phones that should be used for the task.
- **Use default numbers checkbox** - Marked by default so it will use the phone numbers defined in the CI. If not, you will need to write them manually.
- **Twilio number** - The phone number Twilio will use to make the call. It must include country prefix.
- **Destination number** - The phone number the Twilio API must call. It must include country prefix.
- **Correspondance table** - In this array you need to fill the relation between xml variables and Clarive variables that will be parsed. Being the first one the value for the xml and the second one the value in Clarive.

Configuration example:

    Twilio CI: TwilioConfig-1
    Use default numbers: Checked
    Correspondance table: title : ${title}
                          description : ${description}
                          status : ${name_status}

The service will return the Twilio rest api response.

### Twilio xml

Using the Twilio API, in the TwiML Bin section, you can configure your xml response for the code.
A configuration example for this response is:

```javascript
  <?xml version="1.0" encoding="UTF-8"?>
  <Response>
    <Say voice="alice">New incident created by {{creator}} with MID {{mid}} in Clarive.
      Name: {{name}}.
      Status: {{status}}.
      Description: {{description}}.
      Urgency: {{urgency}}.
      Priority level: {{priority}}.
      Impact: {{impact}}.
    </Say>
  </Response>
```

Where all names between '{{}}' are the variables there must always be in the xml code if you want to use them, as those are the variables that will be send by the plugin from the correspondance table.
