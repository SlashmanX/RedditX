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
			_this.toolbar = new App.View.SubmissionToolBar({
				model: _this.model
			});

			_this.Toolbar.show(_this.toolbar);

			var View = App.Parsers.Parse(_this.model.get('url'));

			_this.Submission.show(new (new View()).template({model: _this.model}));

			$('#submission').removeClass('hidden').addClass('shown');
		}
	});

	App.View.SubmissionViewer = SubmissionViewer;
})(window.App);
