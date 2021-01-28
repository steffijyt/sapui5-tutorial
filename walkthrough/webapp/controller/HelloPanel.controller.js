sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
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
        // if the dialog in the fragment does not exist yet, the fragment is instantiated by calling the Fragment.load API with the following arguments:
        // 1. the ID of the HelloPanel view
        // this parameter is used to prefix the IDs inside our fragment
        // there, we have defined the ID helloDialog for the Dialog control, and we can access the dialog via the view by calling oView.byId("helloDialog")
        // this makes sure that even if you instantiate the same fragment in other views in the same way, each dialog will have its unique ID that is concatenated from the view ID and the dialog ID
        // using unique IDs is important, because duplicate IDs lead to errors in the framework
        // 2. the name of the fragment
        // we add the dialog as "dependent" on the view to be connected to the lifecycle of the view’s model
        // a convenient side-effect is that the dialog will automatically be destroyed when the view is destroyed
        // otherwise, we would have to destroy the dialog manually to free its resources
        // always use the addDependent method to connect the dialog to the lifecycle management and data binding of the view, even though it is not added to its UI tree
        // private functions and variables should always start with an underscore
        onOpenDialog: function () {
            var oView = this.getView();

            // create dialog lazily
            if (!this.pDialog) {
                this.pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui.demo.walkthrough.view.HelloDialog"
                }).then(function (oDialog) {
                    // connect dialog to the root view of this component (models, lifecycle)
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this.pDialog.then(function (oDialog) {
                oDialog.open();
            });
        }
    });
});