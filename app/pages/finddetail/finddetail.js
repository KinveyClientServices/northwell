var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var view = require("ui/core/view");
var observable = require("data/observable");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var Frame = require("ui/frame");
var FindDetailPage = function() {};
FindDetailPage.prototype = new BasePage();
FindDetailPage.prototype.constructor = FindDetailPage;
var myItems;
var observable_array_1 = require("data/observable-array");
var tmpobservable = new observable.Observable();

myItems = new observable_array_1.ObservableArray();

// Place any code you want to run when the home page loads here.
FindDetailPage.prototype.contentLoaded = function(args) {
    var page = args.object;

    console.log(myItems.length);

   
};

FindDetailPage.prototype.goBack = function(args) {
    console.log('goback');

    topmost().navigate("pages/findadoc/findadoc");
}

FindDetailPage.prototype.getDoctor = function(args) {
    console.log('getDoctor');
    console.dir(myItems.getItem(args.index));

    topmost().navigate({
        moduleName: "pages/founddoctor/founddoctor",
        context: { doctor: myItems.getItem(args.index)},
        animated: true
    });

}



FindDetailPage.prototype.onPageLoad = function(args) {
    console.log('find detail page loaded');

    var page = args.object;

    //if ( page.navigationContext.fap ) {
    console.dir(page.navigationContext.fap);
    console.dir(page.navigationContext.city);
    console.dir(page.navigationContext.gender);
    console.dir(page.navigationContext.mdgroup);

    var dataStore = Kinvey.DataStore.collection('search', Kinvey.DataStoreType.Network);

    var query = new Kinvey.Query();
    query.equalTo('gender', page.navigationContext.gender);
    //query.limit=10;
    //query.skip=0;

    var stream = dataStore.find(query);
    stream.subscribe(function onNext(entities) {

        console.log(entities.length);
        //console.dir(entities);

        while (myItems.length > 0) {
            myItems.pop();
        }

        for (i = 0; i < entities.length; i++) {

            console.log(entities[i]);
            myItems.push(entities[i]);
        }

        tmpobservable.set("myItems", myItems);
        page.bindingContext = tmpobservable;

    }, function onError(error) {
        console.log(error);
    }, function onComplete() {

        console.log('patients data fetch complete');
    });

    

};

module.exports = new FindDetailPage();
