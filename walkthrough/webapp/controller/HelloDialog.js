// we expand our reuse concept and invoke the dialog at component level
// previously, we created a dialog as fragment, to make it reusable across views or across our whole app
// but we placed the logic for retrieving the dialog instance and for opening and closing it respectively in the controller of the HelloPanel view
// sticking to this approach would require copying and pasting the code to the controller of each view that needs our dialog
// this would cause an undesired code redundancy which we want to avoid
// we implement the solution to this problem: we expand our reuse concept and invoke the dialog at component level

// the implementation of the HelloDialog reuse object extends an sap.ui.base.ManagedObject object to inherit some of the core functionality of SAPUI5
sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
], function (ManagedObject, Fragment) {
    "use strict";

    return ManagedObject.extend("sap.ui.demo.walkthrough.controller.HelloDialog", {

        constructor: function (oView) {
            this._oView = oView;
        },

        // we also add an exit function, just like we did in the component, that will be called automatically when the object is being destroyed
        // to free up all allocated memory in the helper object, we delete the property that holds the reference to the view
        // the view itself will be destroyed by the component, so we don't need to take care of that
        exit: function () {
            delete this._oView;
        },

        // the open method now contains our dialog instantiation
        // the first time the open method is called, the dialog is instantiated
        // the oView argument of this method is used to connect the current view to the dialog
        // we will call the open method of this object later in the controller
        open: function () {
            var oView = this._oView;

            // create dialog lazily
            if (!this.pDialog) {
                var oFragmentController = {
                    onCloseDialog: function () {
                        // note: We don't need to chain to the pDialog promise, since this event-handler
                        // is only called from within the loaded dialog itself.
                        oView.byId("helloDialog").close();
                    }
                };
                // load asynchronous XML fragment
                // we do not pass a controller as third parameter to function Fragment.load but a local helper object oFragmentContoller which included the needed event handler function onCloseDialog for the fragment
                this.pDialog = Fragment.load({
                    // this parameter is used to prefix the IDs inside our fragment
                    // there, we have defined the ID helloDialog for the Dialog control, and we can access the dialog via the view by calling oView.byId("helloDialog")
                    // this makes sure that even if you instantiate the same fragment in other views in the same way, each dialog will have its unique ID that is concatenated from the view ID and the dialog ID
                    // using unique IDs is important, because duplicate IDs lead to errors in the framework
                    id: oView.getId(),
                    // the name of the fragment
                    // we add the dialog as "dependent" on the view to be connected to the lifecycle of the view’s model
                    // a convenient side-effect is that the dialog will automatically be destroyed when the view is destroyed
                    // otherwise, we would have to destroy the dialog manually to free its resources
                    // always use the addDependent method to connect the dialog to the lifecycle management and data binding of the view, even though it is not added to its UI tree
                    name: "sap.ui.demo.walkthrough.view.HelloDialog",
                    // you can pass a controller object to the Fragment.load API
                    // the third parameter does not necessarily have to be a controller but can be any object
                    controller: oFragmentController
                }).then(function (oDialog) {
                    // connect dialog to the root view of this component (models, lifecycle)
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this.pDialog.then(function (oDialog) {
                oDialog.open();
            });
        }

    });

});