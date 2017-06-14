(function(params) {

    var userSidTextField = Cla.ui.textField({
        name: 'userSid',
        fieldLabel: _('User SID'),
        value: params.rec.userSid || ''
    });

    var authTokenTextField = Cla.ui.textField({
        name: 'authToken',
        fieldLabel: _('Authentication Token'),
        value: params.rec.authToken || ''
    });

    var responseUrlTextField = Cla.ui.textField({
        name: 'responseUrl',
        fieldLabel: _('Response Url'),
        value: params.rec.responseUrl || ''
    });

    var twilioNumberTextField = Cla.ui.textField({
        name: 'twilioNumber',
        fieldLabel: _('Twilio number'),
        value: params.rec.twilioNumber || ''
    });

    var destinationNumberTextField = Cla.ui.textField({
        name: 'destinationNumber',
        fieldLabel: _('Destination number'),
        value: params.rec.destinationNumber || ''
    });

    return [
        userSidTextField,
        authTokenTextField,
        responseUrlTextField,
        twilioNumberTextField,
        destinationNumberTextField
    ];
})
