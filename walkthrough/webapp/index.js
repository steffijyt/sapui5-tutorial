// index.js script that will contain the application logic for this tutorial step
// we do this to avoid having executable code directly in the HTML file for security reasons
// this script will be called by the index.html, we defined it there as a module in a declarative way
sap.ui.define([
    "sap/m/Text"
], function (Text) {
    "use strict";

    // in the beginning, we use the JavaScript control interface to set up the UI, the control instance is then placed into the HTML body
    // controls are used to define appearance and behavior of parts of the screen
    // the callback of the init event is where we now instantiate a SAPUI5 text control
    // the name of the control is prefixed by the namespace of its control library sap/m/
    // the options are passed to the constructor with a JavaScript object
    // we set the text property to the value “Hello World”
    // we chain the constructor call of the control to the standard method placeAt that is used to place SAPUI5 controls inside a node of the document object model(DOM) or any other SAPUI5 control instance
    // we pass the ID of a DOM node as an argument
    // as the target node we use the body tag of the HTML document and give it the ID content
    new Text({
        text: "Hello World"
    }).placeAt("content");
});