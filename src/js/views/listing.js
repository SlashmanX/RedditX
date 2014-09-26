(function (App) {
	'use strict';

	var Listing = Backbone.Marionette.ItemView.extend({
		template: '#listing-tpl',

		tagName: 'article',
		className: 'listing'
		
	});
	App.View.Listing = Listing;
})(window.App);