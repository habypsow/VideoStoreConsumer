import Backbone from 'backbone';

import MovieView from './movie_view';

var MovieListView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    //add additional needed templates here

    this.listenTo(this.model, "update", this.render);

    var that = this;
    this.model.fetch();
  },
  render: function() {
    this.$('#rental-list').empty();
    var that = this;
    this.model.each((rental) => {
      var movieView = new MovieView({
        model: rental,
        template: that.template
      });
      this.$('#rental-list').append(movieView.render().$el);
    });
    return this;
  }
});

export default MovieListView;
