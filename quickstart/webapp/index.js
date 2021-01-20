// will be called as soon as SAPUI5 is loaded and initialized
sap.ui.define([
    "sap/ui/core/mvc/XMLView"
], function (XMLView) {
    "use strict";

    // introduce a proper XML view to separate the presentation from the controller logic
    // prefix the view name Quickstart.App with our newly defined namespace
    // the view is loaded asynchronously
    XMLView.create({ viewName: "Quickstart.App" }).then(function (oView) {
        oView.placeAt("content"); // the view is placed in the element with the content ID after it has finished loading
    });
});