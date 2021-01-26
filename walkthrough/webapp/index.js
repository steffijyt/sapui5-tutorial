// index.js script that will contain the application logic for this tutorial step
// we do this to avoid having executable code directly in the HTML file for security reasons
// this script will be called by the index.html, we defined it there as a module in a declarative way
sap.ui.define([
    "sap/ui/core/mvc/XMLView"
], function (XMLView) {
    "use strict";

    // the instantiation of our new App XML view
    // the view is created by a factory function of SAPUI5 which makes sure that the view is correctly configured and can be extended by customers
    // The name is prefixed with the namespace sap.ui.demo.walkthrough.view in order to uniquely identify this resource
    XMLView.create({
        viewName: "sap.ui.demo.walkthrough.view.App"
    }).then(function (oView) {
        oView.placeAt("content");
    });
});