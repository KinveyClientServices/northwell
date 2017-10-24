var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var view = require("ui/core/view");
var observable = require("data/observable");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var Frame = require("ui/frame");
var FindADocPage = function() {};
FindADocPage.prototype = new BasePage();
FindADocPage.prototype.constructor = FindADocPage;
var myItems;
var observableArray = require("data/observable-array");
var observable_array_1 = require("data/observable-array");
var tmpobservable = new observable.Observable();

myItems = new observable_array_1.ObservableArray();
var faparray = new observableArray.ObservableArray();
var yesnoarray = new observableArray.ObservableArray();




// Place any code you want to run when the home page loads here.
FindADocPage.prototype.contentLoaded = function(args) {
    var page = args.object;

    faparray.push(true);
    faparray.push(false);
    yesnoarray.push("yes");
    yesnoarray.push("no");

    var dataStore = Kinvey.DataStore.collection('patientlist', Kinvey.DataStoreType.Network);

    // load doctor data
    //
    var subscription = dataStore.find()
        .subscribe(function(entities) {
            console.log(entities);
            while(myItems.length > 0 ) {
                myItems.pop();
            }
            for (i=0;i<entities.length;i++) {
                console.log(entities[i]);
                myItems.push(entities[i]);
            }

            tmobservable.set("yesno", yesnoarray);
            tmpobservable.set("fapvalues", faparray);
            page.bindingContext = tmpobservable;
        }, function(error) {
            console.log(error);
        }, function() {
            console.log('pulled patients');
        });

    //
};

FindADocPage.prototype.selectAccount = function(args) {
    console.log('select patients');
    console.dir(myItems.getItem(args.index));

    topmost().navigate({
        moduleName: "pages/patientdetail/patientdetail",
        context: { myid: myItems.getItem(args.index)._id},
        animated: true
    });

    //console.dir( myItems);

}

FindADocPage.prototype.findMe = function(args) {
    console.log('findMe');
    var sender = args.object;
    var parent = sender.parent;
    var sGender = view.getViewById(parent, "gender").text;
    var sFap = view.getViewById(parent, "fap").text;
    var sCity = view.getViewById(parent, "city").text;
    var sMDGroup = view.getViewById(parent, "mdgroup").text;

    console.log( sGender + ", " + sCity + ", " + sFap + ", " + sMDGroup);

    topmost().navigate({
        moduleName: "pages/finddetail/finddetail",
        context: { gender: sGender, city: sCity, fap: sFap, mdgroup: sMDGroup},
        animated: true
    });


    /*var dataStore = Kinvey.DataStore.collection('search', Kinvey.DataStoreType.Network);

    //var query = new Kinvey.Query();
    //query.equalTo('gender', );

    var stream = dataStore.find();
    stream.subscribe(function onNext(entities) {

        console.log(entities.length);

        while (myItems.length > 0) {
            myItems.pop();
        }

        for (i = 0; i < entities.length; i++) {

            console.log(entities[i]);
            myItems.push(entities[i]);
        }

    }, function onError(error) {
        console.log(error);
    }, function onComplete() {

        console.log('patients data fetch complete');
    });*/
};

function onPageLoad(args) {
    console.log('patients page loaded');

};

module.exports = new FindADocPage();
exports.onPageLoad = onPageLoad;