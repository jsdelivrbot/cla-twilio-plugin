(function(params) {

    var twilioCiCombo = Cla.ui.ciCombo({
        name: 'twilioCi',
        class: 'TwilioConfig',
        fieldLabel: _('Twilio CI'),
        value: params.data.twilioCi || '',
        allowBlank: false
    });

    var defaultNumberCheckBox = Cla.ui.checkBox({
        name: 'defaultNumber',
        fieldLabel: _('Use default numbers'),
        checked: params.data.defaultNumber || true
    });

    defaultNumberCheckBox.on('check', function() {
        var v = defaultNumberCheckBox.checked;
        if (v) {
            twilioNumberTextField.hide();
            destinationNumberTextField.hide();
            twilioNumberTextField.allowBlank = true;
            destinationNumberTextField.allowBlank = true;
        } else {
            twilioNumberTextField.show();
            destinationNumberTextField.show();
            twilioNumberTextField.allowBlank = false;
            destinationNumberTextField.allowBlank = false;
        }
    });

    var twilioNumberTextField = Cla.ui.textField({
        name: 'twilioNumber',
        fieldLabel: _('Twilio number'),
        value: params.data.twilioNumber || '',
        hidden: (defaultNumberCheckBox.checked == 1), 
        allowBlank: false
    });

    var destinationNumberTextField = Cla.ui.textField({
        name: 'destinationNumber',
        fieldLabel: _('Destination number'),
        value: params.data.destinationNumber || '',
        hidden: (defaultNumberCheckBox.checked == 1), 
        allowBlank: false
    });

    var correspondanceHash = Cla.ui.dataEditor({
            name: 'correspondance',
            title: _('Correspondance table'),
            hide_save: true,
            hide_cancel: true,
            hide_type: true,
            height: 500,
            data: params.data.correspondance ||
              {
                'title' : 'title',
                'description': 'description',
                'status' : 'name_status'
              }
        });

    return [
        twilioCiCombo,
        defaultNumberCheckBox,
        twilioNumberTextField,
        destinationNumberTextField,
        correspondanceHash
    ];
})