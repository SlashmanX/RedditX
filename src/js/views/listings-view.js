(function (App) {
	'use strict';
	var ListingsView = Backbone.Marionette.CollectionView.extend({
		tagName: 'ul',
		className: 'listings',
		itemView: App.View.Listing
	});
	App.View.ListingsView = ListingsView;
})(window.App);