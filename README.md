# SN_Test

This demonstrates a bug with VS 2013's new RequireJS intellisense functionality.  When a module (a) requires another module (b)
that includes handlebards, the intellisense for module (a) breaks completely.

1)  Scripts/App/Main/header.js includes the Smer module located in Common/Utils/smer.js

2)  Smer requires jQuery, Lodash, Handlebars, and Navigation.html

3)  Inside header.js, intellisense does not work if Smer is required in the module.

