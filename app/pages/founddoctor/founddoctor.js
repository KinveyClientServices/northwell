var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var view = require("ui/core/view");
var observable = require("data/observable");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var Frame = require("ui/frame");
var FoundDoctorPage = function() {};
FoundDoctorPage.prototype = new BasePage();
FoundDoctorPage.prototype.constructor = FoundDoctorPage;
var myItems;
var observable_array_1 = require("data/observable-array");
var tmpobservable = new observable.Observable();
var Observable = require("data/observable").Observable;
var viewModel = new Observable();

myItems = new observable_array_1.ObservableArray();

// Place any code you want to run when the home page loads here.
FoundDoctorPage.prototype.contentLoaded = function(args) {
    var page = args.object;

    console.log(myItems.length);



   
};

FoundDoctorPage.prototype.goBack = function(args) {
    console.log('goback');

    topmost().navigate("pages/findadoc/findadoc");
}


FoundDoctorPage.prototype.onPageLoad = function(args) {
    console.log('found doctor page loaded');
    var page = args.object;
    console.dir( page.navigationContext.doctor);
    viewModel.set("doctor", page.navigationContext.doctor);
    page.bindingContext = viewModel;
    //tmpobservable.set("myItems", page.navigationContext.doctor);
    //page.bindingContext = tmpobservable;   

};

module.exports = new FoundDoctorPage();
