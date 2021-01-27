// we will encapsulate all UI assets in a component that is independent from our index.html file
// components are independent and reusable parts used in SAPUI5 applications
// whenever we access resources, we will now do this relatively to the component (instead of relatively to the index.html)
// this architectural change allows our app to be used in more flexible environments than our static index.html page, such as in a surrounding container like the SAP Fiori launchpad

// we create an initial Component.js file in the webapp folder that will hold our application setup
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
], function (UIComponent, JSONModel) {
    "use strict";
    return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
        // the Component.js file consists of two parts now:
        // 1. the metadata section and
        // 2. the init function that is called when the component is initialized
        // in the component's metadata section, we now replace the rootView property with the property key manifest and the value json
        // this defines a reference to the descriptor that will be loaded and parsed automatically when the component is instantiated
        // we can now completely remove the lines of code containing the model instantiation for our resource bundle
        // it is done automatically by SAPUI5 with the help of the configuration entries in the descriptor
        metadata: {
            manifest: "json"
        },
        // the init function of the component is automatically invoked by SAPUI5 when the component is instantiated
        // our component inherits from the base class sap.ui.core.UIComponent and it is obligatory to make the super call to the init function of the base class in the overridden init method
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
        }
    });
});

// all application-specific configuration settings will now further be put in a separate descriptor file called manifest.json
// this clearly separates the application coding from the configuration settings and makes our app even more flexible
// for example, all SAP Fiori applications are realized as components and come with a descriptor file in order to be hosted in the SAP Fiori launchpad
// the SAP Fiori launchpad acts as an application container and instantiates the app without having a local HTML file for the bootstrap
// instead, the descriptor file will be parsed and the component is loaded into the current HTML page
// this allows several apps to be displayed in the same context
// each app can define local settings, such as language properties, supported devices, and more
// and we can also use the descriptor file to load additional resources and instantiate models like our i18n resource bundle
// the content of the manifest.json file is a configuration object in JSON format that contains all global application settings and parameters
// the manifest file is called the descriptor for applications, components, and libraries and is also referred to as “descriptor” or “app descriptor” when used for applications
// it is stored in the webapp folder and read by SAPUI5 to instantiate the component
// there are three important sections defined by namespaces in the manifest.json file:

// 1. sap.app: the sap.app namespace contains the following application - specific attributes:
// id(mandatory): the namespace of our application component, the ID must not exceed 70 characters, it must be unique and must correspond to the component ID / namespace
// type: defines what we want to configure, here: an application
// i18n: defines the path to the resource bundle file
// title: title of the application in handlebars (a simple templating language) syntax referenced from the app's resource bundle
// description: short description text what the application does in handlebars syntax referenced from the app's resource bundle
// * properties of the resource bundle are enclosed in two curly brackets in the descriptor, this is not a SAPUI5 data binding syntax, but a variable reference to the resource bundle in the descriptor in handlebars syntax, the referred texts are not visible in the app built in this tutorial but can be read by an application container like the SAP Fiori launchpad
// applicationVersion: the version of the application to be able to easily update the application later on

// 2. sap.ui: the sap.ui namespace contributes the following UI - specific attributes:
// technology: this value specifies the UI technology; in our case we use SAPUI5
// deviceTypes: tells what devices are supported by the app: desktop, tablet, phone (all true by default)

// 3. sap.ui5: the sap.ui5 namespace adds SAPUI5 - specific configuration parameters that are automatically processed by SAPUI5, the most important parameters are:
// rootView: if you specify this parameter, the component will automatically instantiate the view and use it as the root for this component
// dependencies: here we declare the UI libraries used in the application
// models: in this section of the descriptor we can define models that will be automatically instantiated by SAPUI5 when the app starts, here we can now define the local resource bundle, we define the name of the model "i18n" as key and specify the bundle file by namespace, as in the previous steps, the file with our translated texts is stored in the i18n folder and named i18n.properties, we simply prefix the path to the file with the namespace of our app