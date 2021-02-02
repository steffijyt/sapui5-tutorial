sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
        // onShowHello event handler function
        onShowHello: function () {
            // read msg from i18n model
            // we access the i18n model to get the text from the message bundle file and replace the placeholder { 0; } with the recipient from our data model
            // the getProperty method can be called in any model and takes the data path as an argument
            // in addition, the resource bundle has a specific getText method that takes an array of strings as second argument
            // the resource bundle can be accessed with the getResourceBundle method of a ResourceModel
            // rather than concatenating translatable texts manually, we can use the second parameter of getText to replace parts of the text with non-static data
            // during runtime, SAPUI5 tries to load the correct i18n_*.properties file based on your browser settings and your locale
            // in our case we have only created one i18n.properties file to make it simple, however, you can see in the network traffic of your browser’s developer tools that SAPUI5 tries to load one or more i18n_*.properties files before falling back to the default i18n.properties file
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            // show message
            MessageToast.show(sMsg);
        },

        // the onOpenDialog method now accesses its component by calling the helper method getOwnerComponent
        // when calling the open method of the reuse object we pass in the current view to connect it to the dialog
        onOpenDialog: function () {
            this.getOwnerComponent().openHelloDialog();
        }
    });
});