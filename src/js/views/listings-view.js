(function (App) {
	'use strict';
	var _this;
	var ListingsView = Backbone.Marionette.CollectionView.extend({

		template: '#list-tpl',
		tagName: 'section',
		className: 'listings',
		itemView: App.View.Listing,
		itemViewContainer: '.items',
		ui : {
			spinner: '.spinner'
		},

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
			console.log('loading');
			console.log(_this);
		},

		onLoaded: function() {
			console.log('loaded');
			_this.ui.spinner.hide();
		}
	});
	App.View.ListingsView = ListingsView;
})(window.App);