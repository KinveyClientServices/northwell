var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var view = require("ui/core/view");
var observable = require("data/observable");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var Frame = require("ui/frame");
var PatientDetailPage = function() {};
PatientDetailPage.prototype = new BasePage();
PatientDetailPage.prototype.constructor = PatientDetailPage;
var myItems;
var observable_array_1 = require("data/observable-array");
var tmpobservable = new observable.Observable();

myItems = new observable_array_1.ObservableArray();

// Place any code you want to run when the home page loads here.
PatientDetailPage.prototype.contentLoaded = function(args) {
    var page = args.object;

    console.log(myItems.length);

   
};

PatientDetailPage.prototype.goBack = function(args) {
    console.log('goback');

    topmost().navigate("pages/patients/patients");
}

PatientDetailPage.prototype.selectAccount = function(args) {
    console.log('select account');
    console.dir(myItems.getItem(args.index));

}



PatientDetailPage.prototype.onPageLoad = function(args) {
    console.log('account detail page loaded');

    var page = args.object;

    console.dir(page.navigationContext.myid);

    var dataStore = Kinvey.DataStore.collection('patients', Kinvey.DataStoreType.Network);
    var stream = dataStore.findById(page.navigationContext.myid);
    stream.subscribe(function onNext(entity) {

        console.dir(entity);

       while (myItems.length > 0) {
            myItems.pop();
        }

        for (i = 0; i < entity.invoice.length; i++) {

             console.dir(entity.invoice[i]);
            myItems.push(entity.invoice[i]);
            console.log(entity.invoice[i].Amount);
            console.log(entity.invoice[i].InvoiceNumber);
        }

        tmpobservable.set("myItems", myItems);
            page.bindingContext = tmpobservable;

    }, function onError(error) {
        console.log(error);
    }, function onComplete() {

        console.log('account detail data fetch complete');
    });

};

module.exports = new PatientDetailPage();
