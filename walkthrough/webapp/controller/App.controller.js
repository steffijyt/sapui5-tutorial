// in SAPUI5, resources are often referred to as modules
// the required modules are enabled to be loaded asynchronously
// we extend the array of required modules with the fully qualified path to sap.m.MessageToast
// once both modules, Controller and MessageToast, are loaded, the callback function is called and we can make use of both objects by accessing the parameters passed on to the function
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
    // in the beginning it holds only a single function called onShowHello that handles the button's press event by showing an alert
    return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
        onShowHello: function () {
            MessageToast.show("Hello World");
        }
    });
});