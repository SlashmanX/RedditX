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

			App.User = new App.Model.User({id: Settings.get('activeUserId')});
			App.User.fetch();
			App.vent.on('user:getinfo', _.bind(this.getUserInfo, this));
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

		getUserInfo: function() {
			Reddit.me().then(function(info) {
				App.User.set('id', info.id);
				App.User.set('name', info.name);
				App.User.set('link_karma', info.link_karma);
				App.User.set('comment_karma', info.comment_karma);
				App.User.set('has_mail', info.has_mail);
				Settings.set('activeUserId', info.id);
			}).catch(function(err) {
				console.error(err);
			})
		}
	});

App.View.MainWindow = MainWindow = MainWindow;
})(window.App);