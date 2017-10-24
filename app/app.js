var application = require("application");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;

Kinvey.init({
    appKey: 'kid_SyA7H3maW',
    appSecret: '1df7a698168041a59a3a9824f2fd1ba9'
});

global.headerColor = '#00ffff';

console.log('inside app.js');
application.start({ moduleName: "pages/home/home" });