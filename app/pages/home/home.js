var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var observableModule = require("data/observable");
var color_1 = require("color");

var HomePage = function() {};
HomePage.prototype = new BasePage();
HomePage.prototype.constructor = HomePage;

var source = new observableModule.Observable();

// Place any code you want to run when the home page loads here.
HomePage.prototype.contentLoaded = function(args) {

    var activeUser = Kinvey.User.getActiveUser();

    if (!activeUser) {
        topmost().navigate("pages/login/login");
    }

    console.log('home loaded');

    var dataStore = Kinvey.DataStore.collection('brand', Kinvey.DataStoreType.Network);

    // Pull branding data
    //
    var subscription = dataStore.find()
        .subscribe(function(entities) {
            console.log(entities);
            var page = args.object;
            page.bindingContext = { brand: entities[0] };
           //getActionBar().setBackgroundDrawable(
    //new ColorDrawable(Color.parseColor("#ff0000")));
        //page.actionBar.backgroundColor = new Color("#00ff00");
            console.log('here');
            console.log(entities[0].PrimaryColor);
            global.headerColor = entities[0].PrimaryColor;

            console.log(global.headerColor);
            //ActionBar actionBar = MainActivity.getInstance().getActionBar();
//actionBar.setBackgroundDrawable(new ColorDrawable(Color.RED));
        }, function(error) {
            console.log(error);
        }, function() {
            var page=args.object;
            try {
            //page.actionBar.backgroundColor = global.headerColor;
            //console.dir(page.actionBar);
        } catch (e) {
            console.log(e);
        }
            console.log('finished pulling home data');
        });

    //

}

HomePage.prototype.navigatingTo = function(args) {
    console.log('navigating to');

    var page = args.object;
    console.log(global.headerColor);
    try {
    page.actionBar.backgroundColor = global.headerColor;
} catch (e) {
    console.log(e);
}
}




module.exports = new HomePage();