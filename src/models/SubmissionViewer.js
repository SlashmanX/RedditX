(function (App) {
	'use strict';

	var _this;

	var SubmissionViewer = Backbone.Marionette.Layout.extend({
		template: '#submission-viewer-tpl',
		className: 'submission-container',
		regions: {
			Toolbar: '.submission-toolbar',
			Submission: '.submission-content'
		},

		initialize: function () {
			_this = this;

		},

		onShow: function () {
			App.vent.trigger('main:showloading');
			_this.toolbar = new App.View.SubmissionToolBar({
				model: _this.model
			});

			_this.Toolbar.show(_this.toolbar);

			var View = App.Parsers.Parse(_this.model.get('url'));

			var view = new View();

			view.setup(_this.model).then(function() {
				var template = view.template;
				_this.Submission.show(new template({model: _this.model}));
				$('#submission').removeClass('hidden').addClass('shown');
				App.vent.trigger('main:hideloading');
			});
		}
	});

	App.View.SubmissionViewer = SubmissionViewer;
})(window.App);
