var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var observableArray = require("data/observable-array");
var observable = require("data/observable");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;



var SearchPage = function() {};
SearchPage.prototype = new BasePage();
SearchPage.prototype.constructor = SearchPage;

var viewModel = new Observable();

// Place any code you want to run when the home page loads here.
SearchPage.prototype.contentLoaded = function(args) {
    console.log('search loaded');


    var array = new observableArray.ObservableArray();


    var page = args.object;

    console.log('array length = ' + array.length);



    viewModel.set("isComplete", false);
    viewModel.set("myAction", "");
    viewModel.set("myDueDate", "");
    page.bindingContext = viewModel;

};

SearchPage.prototype.changeMe = function(args) {
    console.log('inside changeme');

    console.log(viewModel.get("isComplete"));

    var entity = {
        action: viewModel.get("myAction"),
        duedate: viewModel.get("myDueDate"),
        completed: viewModel.get("isComplete"),
        Title: "Personal Task"
    }

    console.dir(entity);

    var dataStore = Kinvey.DataStore.collection('tasks', Kinvey.DataStoreType.Network);

    var promise = dataStore.save(entity)
        .then(function(entity) {
            console.log(entity);
            // reset view
            //
            viewModel.set("isComplete", false);
            viewModel.set("myAction", "");
            viewModel.set("myDueDate", "");

            var dialogs = require("ui/dialogs");
            dialogs.alert({
                title: "Task Added",
                message: "Task successfully persisted to the backend.",
                okButtonText: "ok"
            }).then(function() {
                console.log("Dialog closed!");
            });
        })
        .catch(function(error) {
            console.log(error);
        });


}

SearchPage.prototype.onPageLoaded = function(args) {
    console.log('search page loaded');

};

SearchPage.prototype.dropDownOpened = function(args) {
    console.log('dropdown opened');
}

SearchPage.prototype.dropDownSelectedIndexChanged = function(args) {
    var page = args.object;
    console.log('dropDownSelectedIndexChanged');
    console.log(args.oldIndex);
    console.log(args.newIndex);

    // find  entity matching title
    //
    var dataStore = Kinvey.DataStore.collection('products', Kinvey.DataStoreType.Network);
    console.log(args);

    var output = '';
    for (var property in args) {
        output += property + ': ' + args[property] + '; ';
    }
    alert(output);


    var query = new Kinvey.Query();
    query.equalTo('title', "CHOOSE YOUR OWN CLOUD: PUBLIC OR PRIVATE");
    var stream = dataStore.find(query);
    stream.subscribe(function onNext(entities) {
        console.log(entities);
    }, function onError(error) {
        console.log(error);
    }, function onComplete() {
        console.log('complete query');
    });


    viewModel.set("selectedIndex", args.newIndex);


    //page.bindingContext = {"selectedIndex":args.newIndex};
}

exports.navigateTo = function(args) {
    console.log('HERE');
};

module.exports = new SearchPage();
//exports.onPageLoad = onPageLoaded;