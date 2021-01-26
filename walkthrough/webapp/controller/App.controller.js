sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    // literal expression was introduced by ECMAScript 5
    // it tells the browser to execute the code in a so called “strict mode”, the strict mode helps to detect potential coding issues at an early state at development time
    // for example, it makes sure that variables are declared before they are used, it helps to prevent common JavaScript pitfalls and it’s therefore a good practice to use strict mode
    "use strict";
    // we define the app controller in its own file by extending the Controller object of the SAPUI5 core
    // in the beginning it holds only a single function called onShowHello that handles the button's press event by showing an alert
    return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
        onShowHello: function () {
            // show a native JavaScript alert
            alert("Hello World");
        }
    });
});