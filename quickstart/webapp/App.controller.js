// we outsource the controller logic to an app controller. The .onPress event now references a function in the controller.
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    // we load the Controller base class and extend it to define the behavior of our app
    return Controller.extend("Quickstart.App", {
        // event handler for our button
        onPress: function () {
            MessageToast.show("Hello App!");
        }
    });

});

// when the button is pressed, we now display a "Hello App" message