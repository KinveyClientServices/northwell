var BasePage = require("../../shared/BasePage");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var view = require("ui/core/view");
var topmost = require("ui/frame").topmost;

var LoginPage = function() {};
LoginPage.prototype = new BasePage();
LoginPage.prototype.constructor = LoginPage;

module.exports = new LoginPage();
var frameModule = require("ui/frame");

var Page;
var email;

exports.pageLoaded = function(args) {
    console.log('loaded');
    Page = args.object;
};

LoginPage.prototype.navigateTo = function(args) {
    console.log('HERE');

    var page = args.object;
    try {
    
} catch (e) {
    console.log(e);
}
};

exports.register = function() {
    console.log('register');
    email = page.getViewById("email");
    pw = page.getViewById("pw");
    console.log(email.text);

    Kinvey.User.login(email.text, pw.text)
        .then(function(user) {
            console.dump(user);
            console.log('logged in');
        })
        .catch(function(error) {
            console.log(error.message);
        });
};


LoginPage.prototype.signIn = function(args) {
    var sender = args.object;
    var parent = sender.parent;

    console.log('signIn');
    email = view.getViewById(parent, "email");
    pw = view.getViewById(parent, "pw");
    console.log(email.text);

    // login with KinveyAuth
    //
    var promise = Kinvey.User.login(email.text, pw.text)
        .then(function(user) {
            console.log(user);
            topmost().navigate("pages/home/home");
        })
        .catch(function(error) {
            console.log(error);
        });


    //
};

LoginPage.prototype.logout = function(args) {
    Kinvey.User.logout()
        .then(function() {
            console.log('logging out');

        })
        .then(function(user) {
            console.log(user);
            var dialogs = require("ui/dialogs");
            dialogs.alert({
                title: "Logout",
                message: "The user has successfully logged out.",
                okButtonText: "ok"
            }).then(function() {
                console.log("Dialog closed!");
            });

            console.log('logged out');
        })
        .catch(function(error) {
            console.log(error.message);
        });
}

LoginPage.prototype.signInMIC = function(args) {

    console.log('signInMIC');

    // login with MIC
    //
    Kinvey.User.loginWithMIC('http://localhost:8100', Kinvey.AuthorizationGrant.AuthorizationCodeLoginPage, { version: 'v2' })
        .then(function(user) {
            console.dir(user);
            topmost().navigate("pages/home/home");
        }).catch(function(error) {
            console.log(error);
        });

    //    
}

module.exports = new LoginPage();