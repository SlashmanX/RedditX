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

		initialize: function() {
			_this = this;

			this.nativeWindow = require('nw.gui').Window.get();

			App.User = new App.Model.User({id: Settings.get('activeUserId')});
			App.User.fetch();

			App.Reddit = new App.Providers.Reddit();

			App.vent.on('user:initialize', _.bind(this.initialUserSetup, this));
			App.vent.on('user:getinfo', _.bind(this.getUserInfo, this));
			App.vent.on('user:getsubreddits', _.bind(this.getUserSubreddits, this));

			App.vent.on('main:gethomepage', _.bind(this.getHomepage, this));
			App.vent.on('main:getsubreddit', _.bind(this.getSubreddit, this));
			App.vent.on('main:getsubmission', _.bind(this.getSubmission, this));

			App.vent.on('main:upvote', _.bind(this.upvote, this));
			App.vent.on('main:downvote', _.bind(this.downvote, this));
			App.vent.on('main:unvote', _.bind(this.unvote, this));
		},

		onShow: function() {
			this.TitleBar.show(new App.View.TitleBar());
			this.SideMenu.show(new App.View.SideMenu({model: App.User}));
			this.getHomepage();

			// Show loading modal on startup
			var that = this;

			// Cancel all new windows (Middle clicks / New Tab)
			this.nativeWindow.on('new-win-policy', function(frame, url, policy) {
				policy.ignore();
			});

		},

		initialUserSetup: function() {
			_this.getUserInfo();
			_this.getUserSubreddits();
		},

		getUserInfo: function() {
			App.Reddit.call('me').then(function(info) {
				App.User.set('id', info.id);
				App.User.set('name', info.name);
				App.User.set('link_karma', info.link_karma);
				App.User.set('comment_karma', info.comment_karma);
				App.User.set('has_mail', info.has_mail);

				Settings.set('activeUserId', info.id);
			}).catch(function(err) {
				console.error(err);
			})
		},

		getUserSubreddits: function(cb) {
			App.Reddit.call('subreddits', {}).then(function(subs) {
				subs = _.sortBy(subs, function(sub) { 
					return sub.display_name.toLowerCase()
				});

				App.User.set('subreddits', subs);
				if(cb) return cb();
			}).catch(function(err) {
				console.error(err);
				if(cb) return cb();
			})
		},

		getHomepage: function(cb) {
			var l = [];
			App.Reddit.call('homepage', {})
			.then(function(listings) {
				_.each(listings, function(listing) {
					l.push(new App.Model.Listing(listing))
				});
				var listingsCollection = new App.Model.ListingCollection(l);
				_this.Content.show(new App.View.ListingsView({collection: listingsCollection}));
			});
		},

		getSubreddit: function(r, opts, cb) {
			var l = [];
			App.Reddit.call('r', r, opts)
			.then(function(listings) {
				_.each(listings, function(listing) {
					l.push(new App.Model.Listing(listing))
				});
				var listingsCollection = new App.Model.ListingCollection(l);
				_this.Content.show(new App.View.ListingsView({collection: listingsCollection}));
			});
		},

		getSubmission: function(article, opts, cb) {
			var l = [];
			App.Reddit.call('submission', article, opts)
			.then(function(sub) {
				console.log(sub);
			});
		},

		upvote: function(article, cb) {
			App.Reddit.call('upvote', article)
			.then(function() {
				cb();
			});
		},

		downvote: function(article, cb) {
			App.Reddit.call('downvote', article)
			.then(function() {
				cb()
			});
		},

		unvote: function(article, cb) {
			App.Reddit.call('unvote', article)
			.then(function() {
				cb();
			});
		}
	});

	App.View.MainWindow = MainWindow = MainWindow;
})(window.App);