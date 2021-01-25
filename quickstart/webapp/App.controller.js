// we outsource the controller logic to an app controller. The .onPress event now references a function in the controller.
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
    "use strict";

    // we load the Controller base class and extend it to define the behavior of our app
    return Controller.extend("Quickstart.App", {
        // event handler for our button
        // the onPress function now also triggers the navigation to the intro page, we fetch the app control by its ID and instruct it to navigate by calling the to method
        onPress: function () {
            MessageToast.show("Hello UI5!");
            this.byId("app").to(this.byId("intro"));
        },

        // the onInit method is a lifecycle hook that is called automatically when the controller is initialized, it defines a simple JSON model with some texts located at the features key
        onInit: function () {
            this.getView().setModel(new JSONModel({
                features: [
                    "Enterprise-Ready Web Toolkit",
                    "Powerful Development Concepts",
                    "Feature-Rich UI Controls",
                    "Consistent User Experience",
                    "Free and Open Source",
                    "Responsive Across Browsers and Devices"
                ]
            })
            );
        },

        onChange: function (oEvent) {
            var bState = oEvent.getParameter("state");
            this.byId("ready").setVisible(bState);
        }
    });

});

// when the button is pressed, we now display a "Hello App" message