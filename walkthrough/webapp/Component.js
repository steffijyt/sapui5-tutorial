// we will encapsulate all UI assets in a component that is independent from our index.html file
// components are independent and reusable parts used in SAPUI5 applications
// whenever we access resources, we will now do this relatively to the component (instead of relatively to the index.html)
// this architectural change allows our app to be used in more flexible environments than our static index.html page, such as in a surrounding container like the SAP Fiori launchpad

// we create an initial Component.js file in the webapp folder that will hold our application setup
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
        // the Component.js file consists of two parts now:
        // 1. the new metadata section that simply defines a reference to the root view and
        // 2. the previously introduced init function that is called when the component is initialized
        // instead of displaying the root view directly in the index.js file as we did previously, the component will now manage the display of the app view
        metadata: {
            "rootView": {
                "viewName": "sap.ui.demo.walkthrough.view.App",
                "type": "XML",
                "async": true,
                "id": "app"
            }
        },
        // the init function of the component is automatically invoked by SAPUI5 when the component is instantiated
        // our component inherits from the base class sap.ui.core.UIComponent and it is obligatory to make the super call to the init function of the base class in the overridden init method
        // in the init function we instantiate our data model and the i18n model like we did before in the app controller
        // be aware that the models are directly set on the component and not on the root view of the component
        // however, as nested controls automatically inherit the models from their parent controls, the models will be available on the view as well
        init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
            // set data model
            var oData = {
                recipient: {
                    name: "World"
                }
            };
            var oModel = new JSONModel(oData);
            this.setModel(oModel);

            // set i18n model
            // we instantiate the ResourceModel that points to the message bundle file where our texts are now located(i18n.properties file)
            // the bundle name sap.ui.demo.walkthrough.i18n.i18n consists of the application namespace sap.ui.demo.walkthrough (the application root as defined in the index.html), the folder name i18n and finally the file name i18n without extension
            // the SAPUI5 runtime calculates the correct path to the resource; in this case the path to our i18n.properties file
            // next, the model instance is set on the component (and not on the root view of the component) as a named model with the key i18n
            // you use named models when you need to have several models available in parallel
            var i18nModel = new ResourceModel({
                bundleName: "sap.ui.demo.walkthrough.i18n.i18n",
                supportedLocales: [""],
                fallbackLocale: ""
            });
            this.setModel(i18nModel, "i18n");
        }
    });
});