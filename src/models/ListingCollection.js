(function(App) {
    'use strict';

    var Q = require('q');

    var ListingCollection = Backbone.Collection.extend({
        model: App.Model.Listing
    });

    App.Model.ListingCollection = ListingCollection;
})(window.App);
