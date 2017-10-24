var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var observableArray = require("data/observable-array");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var geolocation = require("nativescript-geolocation");

var mapbox = require("nativescript-mapbox");
var mapmarkers = [];
var counter = 0;
var Page;

var MapPage = function() {};
MapPage.prototype = new BasePage();
MapPage.prototype.constructor = MapPage;

// Place any code you want to run when the home page loads here.
MapPage.prototype.contentLoaded = function(args) {
    console.log('map loaded');
};

MapPage.prototype.onPageLoaded = function(args) {
    console.log('map page loaded');

    Page = args.object;

};

MapPage.prototype.changeMe = function(args) {
    console.log('change me');
    counter++;
    console.log(counter);
    console.dir(args);

    var thisdist = Page.getViewById("distance");
    console.dir(thisdist.text);

    var location = geolocation.getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, timeout: 20000 }).
    then(function(loc) {
        if (loc) {
            console.log("Current location is: " + loc);
            console.dir(loc);

            var coord = [loc.longitude, loc.latitude];

            var query = new Kinvey.Query();
            console.log(thisdist.text);
            query.near('_geoloc', coord, thisdist.text);
            console.log('here2');
            var dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network);
            console.log('here3');
            var stream = dataStore.find(query);
            stream.subscribe(function onNext(entities) {

                console.log(entities.length);

                // put _geoloc points on the map
                //
                mapmarkers = [];


                for (i = 0; i < entities.length; i++) {
                    thisaccount = entities[i];
                    mapmarkers.push({
                        lat: thisaccount._geoloc[0],
                        lng: thisaccount._geoloc[1],
                        title: thisaccount.accountname,
                        subtitle: thisaccount.accountcompany
                    });
                }

                //console.log(args.map);

                args.map.addMarkers(mapmarkers);


            }, function onError(error) {
                console.log(error);
            }, function onComplete() {

                console.log('account map data fetch complete');
            });
        }
    }, function(e) {
        console.log("Error: " + e.message);
    });

    // now you have the radius, do a lookup
    //
    /*var query = new Kinvey.Query();
    query.near('_geoloc', thisdist.text);
    var dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network);
    var stream = dataStore.find(query);
    stream.subscribe(function onNext(entities) {

        console.log(entities.length);

        // put _geoloc points on the map
        //
        mapmarkers = [];


        for (i = 0; i < entities.length; i++) {
            thisaccount = entities[i];
            mapmarkers.push({
                lat: thisaccount._geoloc[0],
                lng: thisaccount._geoloc[1],
                title: thisaccount.accountname,
                subtitle: thisaccount.accountcompany
            });
        }

        console.log(args.map);

        args.map.addMarkers(mapmarkers);


    }, function onError(error) {
        console.log(error);
    }, function onComplete() {

        console.log('account map data fetch complete');
    });*/


    //console.log(page.distance.text);
}

MapPage.prototype.onMapReady = function(args) {
    console.log('map ready');

    // pull account geo data
    //
    var dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network);
    var stream = dataStore.find();
    stream.subscribe(function onNext(entities) {

        console.log(entities.length);

        // put _geoloc points on the map
        //
        mapmarkers = [];


        for (i = 0; i < entities.length; i++) {
            thisaccount = entities[i];
            mapmarkers.push({
                lat: thisaccount._geoloc[0],
                lng: thisaccount._geoloc[1],
                title: thisaccount.accountname,
                subtitle: thisaccount.accountcompany
            });
        }

        console.log(args.map);

        /*args.map.addMarkers([{
            //id: 2,
            lat: 38.0000,
            lng: -97.0000,
            title: 'One-line title here', // no popup unless set
            subtitle: 'Really really nice location'
            //iconPath: 'res/markers/green_pin_marker.png',
            //onTap: function() { console.log("'Nice location' marker tapped"); },
            //onCalloutTap: function() { console.log("'Nice location' marker callout tapped"); }
        }]);*/

        args.map.addMarkers(mapmarkers);


    }, function onError(error) {
        console.log(error);
    }, function onComplete() {

        console.log('account map data fetch complete');
    });
}

exports.navigateTo = function(args) {
    console.log('HERE');
};

module.exports = new MapPage();
//exports.onPageLoad = onPageLoaded;