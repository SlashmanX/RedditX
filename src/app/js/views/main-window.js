(function(App) {
	'use strict';

	var _this;
	var Reddit;

	var MainWindow = Backbone.Marionette.Layout.extend({
		template: '#main-window-tpl',

		id: 'main-window',

		regions: {
			TitleBar: '#title-bar',
			SideMenu: '#side-menu',
			Content: '#content'
		},

		initialize: function() {
			_this = this;

			this.nativeWindow = require('nw.gui').Window.get();
			Reddit = App.Providers.Reddit;

			App.User = new App.Model.User({id: 1});
			App.User.fetch();

			App.vent.on('user:login', _.bind(this.updateUserInfo, this));
			App.vent.on('user:gotinfo', _.bind(this.updateUserInfo, this));
		},

		onShow: function() {
			this.TitleBar.show(new App.View.TitleBar());
			this.SideMenu.show(new App.View.SideMenu({model: App.User}));

			// Show loading modal on startup
			var that = this;

			// Cancel all new windows (Middle clicks / New Tab)
			this.nativeWindow.on('new-win-policy', function(frame, url, policy) {
				policy.ignore();
			});

		},
		updateUserInfo: function () {
			// Just refresh the side menu for now
			//Reddit.me().then(function(info) {
				//App.User = new App.Model.User(info);
				_this.SideMenu.show(new App.View.SideMenu(App.User));
			//}).catch(function(err) {
			//	console.error(err);
			//})
		}
	});

App.View.MainWindow = MainWindow = MainWindow;
})(window.App);