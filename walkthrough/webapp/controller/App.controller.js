// in SAPUI5, resources are often referred to as modules
// the required modules are enabled to be loaded asynchronously
// once the modules are loaded, the callback function is called and we can make use of the objects by accessing the parameters passed on to the function
// this Asynchronous Module Definition(AMD) syntax allows to clearly separate the module loading from the code execution and greatly improves the performance of the application
// the browser can decide when and how the resources are loaded prior to code execution
// use sap.ui.define for controllers and all other JavaScript modules to define a global namespace, with the namespace, the object can be addressed throughout the application
// use sap.ui.require for asynchronously loading dependencies but without declaring a namespace, for example code that just needs to be executed, but does not need to be called from other code
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
    // use the name of the artifact to load for naming the function parameters (without namespace)
], function (Controller, MessageToast) {
    // literal expression was introduced by ECMAScript 5
    // it tells the browser to execute the code in a so called “strict mode”, the strict mode helps to detect potential coding issues at an early state at development time
    // for example, it makes sure that variables are declared before they are used, it helps to prevent common JavaScript pitfalls and it’s therefore a good practice to use strict mode
    "use strict";
    // we define the app controller in its own file by extending the Controller object of the SAPUI5 core
    return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
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
        }
    });
});