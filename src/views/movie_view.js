import Backbone from 'backbone';

var MovieView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;

    this.listenTo(this.model, "change", this.render);
  },
  render: function() {
    var compiledTemplate = this.template({rental: this.model.toJSON()});
    this.$el.html(compiledTemplate);
    return this;
  }
});

export default MovieView;
