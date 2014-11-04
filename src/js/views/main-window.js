(function(App) {
	'use strict';

	var _this;

	var MainWindow = Backbone.Marionette.Layout.extend({
		template: '#main-window-tpl',

		id: 'main-window',

		regions: {
			TitleBar: '#title-bar',
			SideMenu: '#side-menu',
			Content: '#content',
			Submission: '#submission'
		},

		ui: {
			LoadingBar: '#loading-bar'
		},

		initialize: function() {
			_this = this;

			this.nativeWindow = require('nw.gui').Window.get();

			App.User = new App.Model.User({id: Settings.get('activeUserId')});
			App.User.fetch();

			App.Reddit = new App.Providers.Reddit();

			App.vent.on('user:initialize', _.bind(this.initialUserSetup, this));
			App.vent.on('user:getinfo', _.bind(this.getUserInfo, this));
			App.vent.on('user:getsubreddits', _.bind(this.getUserSubreddits, this));
			App.vent.on('main:getsubmission', _.bind(this.getSubmission, this));

			App.vent.on('main:upvote', _.bind(this.upvote, this));
			App.vent.on('main:downvote', _.bind(this.downvote, this));
			App.vent.on('main:unvote', _.bind(this.unvote, this));

			App.vent.on('main:showloading', _.bind(this.showLoading, this));
			App.vent.on('main:hideloading', _.bind(this.hideLoading, this));
		},

		onShow: function() {
			this.TitleBar.show(new App.View.TitleBar());
			this.SideMenu.show(new App.View.SideMenu({model: App.User}));
			this.Content.show(new App.View.RedditBrowser());

			// Show loading modal on startup
			var that = this;

			// Cancel all new windows (Middle clicks / New Tab)
			this.nativeWindow.on('new-win-policy', function(frame, url, policy) {
				policy.ignore();
			});

			App.vent.trigger('user:initialize');

		},

		initialUserSetup: function() {
			_this.getUserInfo();
			_this.getUserSubreddits();
		},

		getUserInfo: function() {
			App.Reddit.call('u').then(function(info) {
				App.User.set('id', info.id);
				App.User.set('name', info.name);
				App.User.set('link_karma', info.link_karma);
				App.User.set('comment_karma', info.comment_karma);
				App.User.set('has_mail', info.has_mail);

				Settings.set('activeUserId', info.id);
			}).catch(function(err) {
				console.error(err);
			});
		},

		getUserSubreddits: function(cb) {
			App.Reddit.call('subscriber').then(function(subs) {
				subs = _.sortBy(subs.submissions, function(sub) {
					return sub.display_name.toLowerCase();
				});

				App.User.set('subreddits', subs);
				if(cb) {
					return cb();
				}
			}).catch(function(err) {
				console.error(err);
				if(cb) {
					return cb();
				}
			});
		},

		getSubmission: function(model, opts, cb) {
			var l = [];
			this.Submission.show(new App.View.SubmissionViewer({
				model: model
			}));
		},

		upvote: function(article, cb) {
			console.log('upvoting: '+ article);
			App.Reddit.call('upvote', article)
			.then(function() {
				cb();
			});
		},

		downvote: function(article, cb) {
			App.Reddit.call('downvote', article)
			.then(function() {
				cb();
			});
		},

		unvote: function(article, cb) {
			App.Reddit.call('unvote', article)
			.then(function() {
				cb();
			});
		},

		showLoading: function() {
			_this.ui.LoadingBar.show();
		},

		hideLoading: function() {
			_this.ui.LoadingBar.hide();
		}
	});

	App.View.MainWindow = MainWindow = MainWindow;
})(window.App);