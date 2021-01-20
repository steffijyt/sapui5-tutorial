// will be called as soon as SAPUI5 is loaded and initialized
sap.ui.define([
    // we load two UI controls - a button and a message toast
    "sap/m/Button",
    "sap/m/MessageToast"
], function (Button, MessageToast) {
    "use strict";

    // the button is defined with a text property and a callback attached to its press event
    new Button({
        text: "Ready...",
        press: function () {
            MessageToast.show("Hello World!");
        }
    }).placeAt("content"); // we place the button in the element with the content ID

});

// open the index.html file in the browser: when the button is pressed, a message toast with the "Hello World" message is shown at the bottom of the screen