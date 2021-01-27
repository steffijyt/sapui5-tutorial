// index.js script that will contain the application logic for this tutorial step
// we do this to avoid having executable code directly in the HTML file for security reasons
// this script will be called by the index.html, we defined it there as a module in a declarative way
sap.ui.define([
    "sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
    "use strict";

    // we now create a component container instead of the view in our index.js that instantiates the view for us according to the component configuration
    new ComponentContainer({
        name: "sap.ui.demo.walkthrough",
        settings: {
            id: "walkthrough"
        },
        async: true
    }).placeAt("content");
});