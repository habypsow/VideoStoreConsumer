import Backbone from 'backbone';

var MovieView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;

    this.listenTo(this.model, "change", this.render);
  },
  attributes: {
    class: 'small-6 medium-3 large-3 columns movie-card-profile'
    // class: 'column column-block'
  },
  events: {
    'click': 'showDetails',
  },
  render: function() {
    var compiledTemplate = this.template({rental: this.model.toJSON()});
    this.$el.html(compiledTemplate);
    return this;
  },
  showDetails: function(event) {
    this.trigger("selected", this.model);
  }
});

export default MovieView;
