(function (App) {
	'use strict';
	var _this;
	var ListingsView = Backbone.Marionette.CollectionView.extend({

		template: '#list-tpl',
		tagName: 'section',
		className: 'listings',
		itemView: App.View.Listing,

		initialize: function () {
			_this = this;
			_this.listenTo(this.collection, 'loading', _this.onLoading);
			_this.listenTo(this.collection, 'loaded', _this.onLoaded);
		},

		onShow: function () {
			if (_this.collection.state === 'loading') {
				_this.onLoading();
			}
		},

		onLoading: function() {
			App.vent.trigger('main:showloading');
		},

		onLoaded: function() {
			App.vent.trigger('main:hideloading');
		}
	});
	App.View.ListingsView = ListingsView;
})(window.App);