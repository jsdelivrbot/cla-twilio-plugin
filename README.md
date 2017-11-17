# Twilio call plugin

<img src="https://cdn.rawgit.com/clarive/cla-twilio-plugin/master/public/icon/twilio.svg?sanitize=true" alt="Twilio Plugin" title="Twilio Plugin" width="120" height="120">

Twilio plugin will allow you to create calls from Twilio API remotely from a Clarive instance.

The Clarive Admin user can use this plugin to program calls automatically to different telephone numbers.

For example, the Admin can program a rule that makes a call and that through Twilio reads the topic content or jobs status.

Another purpose is to be able to notify through a call to the Admin about an event that occurs in Clarive (When a new user is registered, end of passes, etc.)

## What is Twilio

Twilio is a cloud communications platform as a service. Twilio allows to programmatically make and receive phone calls and send and receive text messages using its web service APIs.

## Requirements

There are no requirements outlined in Clarive in order to work with this plugin.

## Installation

To install the plugin, place the cla-twilio-plugin folder inside the `$CLARIVE_BASE/plugins`
directory in a Clarive instance.

### Clarive config list

**Only Clarive EE**

The variables created by the plugin are:

- **config.twilio.baseUrl** - With a default value, where names between '${}' are the variables to get from the TwilioConfig Resource
- **config.twilio.makeCall** - With a default value, where names between '${}' are the variables to get from the TwilioConfig Resource

### TwilioConfig Resource

To configurate the TwilioConfig Resource open:

In **Clarive SE**: Resources -> ClariveSE.

In **Clarive EE**: Resources -> Twilio.

You will be able to save your configuration for the Twilio API in this Resource. The main fields are:

- **User SID** - Your Twilio user ID to be able to launch remote commands.
- **Authentication token** - User token to be able to launch remote commands.
- **Response URL** - URL for the XML code That Twilio API needs to read the topic. See the XML Configuration (See the example below) to know the fields it needs.
- **Twilio number** - The phone number Twilio will use to make the call. It must include country prefix.
- **Destination number** - The phone number the Twilio API must call. It must include country prefix.

Configuration example:

    User SID: asDEFFdds4t3242Rrf245e2r
    Authentication Token: werr2rfRF4t3trRERG34
    Response URL: https://myresponse.com/responseForTheCode
    Twilio number: +34666555777
    Destination number: +34777666555

### Twilio call

This service will let you configure you Twilio settings and the data you want to send.

The various parameters are:

- **Twilio Resource (variable name: twilio_resource)** - Select the Resource with the user and phones that should be used for the task.
- **Use default numbers (default_number)** - Marked by default so it will use the phone numbers defined in the Resource. If not, you will need to write them manually.
- **Twilio number (twilio_number)** - The phone number Twilio will use to make the call. It must include country prefix.
- **Destination number (destination_number)** - The phone number the Twilio API must call. It must include country prefix.
- **Correspondance table (correspondance)** - In this array you need to fill the relation between XML variables and Clarive variables that will be parsed. Being the first one the value for the XML and the second one the value in Clarive.

### Twilio XML

Using the Twilio API, in the TwiML Bin section, you can configure your XML response for the code.
A configuration example for this response is:

```javascript
  <?XML version="1.0" encoding="UTF-8"?>
  <Response>
    <Say voice="alice">New incident created by {{creator}} with MID {{mid}} in Clarive.
      Name: {{name}}.
      Status: {{status}}.
      Description: {{description}}.
    </Say>
  </Response>
```

Where all names between '{{}}' are the variables there must always be in the XML code if you want to use them, as those are the variables that will be send by the plugin from the correspondance table.

An example with job data:

```javascript
  <?XML version="1.0" encoding="UTF-8"?>
  <Response>
    <Say voice="alice">
    New job started at {{job_creation_date}} with the topic {{topic_mid}}.
    Current Job Status: {{job_status}}
    Environment: {{job_environment}}
    Deployed by: {{User}}
    </Say>
  </Response>
```

## How to use

### In Clarive EE

Once the plugin is placed in its folder, you can find this service in the palette in the section of generic service and can be used like any other palette op.

Example:

```yaml
    Twilio Resource: TwilioConfig-1
    Use default numbers: Checked
    Correspondance table: name : ${title}
                          description : ${description}
                          status : ${name_status}
                          creator : ${created_by}
                          mid : ${topic_mid}
``` 

An example with job data:

```yaml
    Twilio Resource: TwilioConfig-1
    Use default numbers: Unchecked
    Twilio number: +18886777339
    Destination number: +1548574892
    Correspondance table: job_creation_date : ${date_creation}
                          job_status : ${status_name}
                          job_environment : ${env_name}
                          User : ${created_by}
                          topic_mid : ${topic_mid}
``` 

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

Example:

```yaml
do:
   - twilio_call:
      twilio_resource: 'twilio_resource'          # Required. Use the mid set to the resource you created
      default_number: '1'                         # Required.
      correspondance: {
                    name : ${title},
                    description : ${description},
                    status : ${name_status},
                    creator : ${created_by},
                    mid : ${topic_mid}
                }
``` 

An example with job data:

```yaml
do:
   - twilio_call:
      twilio_resource: 'twilio_resource'          # Required. Use the mid set to the resource you created
      default_number: '1'                         # Required.
      correspondance: {
                   job_creation_date : ${date_creation},
                   job_status : ${status_name},
                   job_environment : ${env_name},
                   User : ${created_by},
                   topic_mid : ${topic_mid}
                }
```

##### Outputs

###### Success

The service will return the response from Twilio API.

###### Possible configuration failures

**Task failed**

You will get the error from the Twilio API.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "twilio_call": "twilio_resource"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `Number` not available for op "twilio_call"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.
