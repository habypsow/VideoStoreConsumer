import Backbone from 'backbone';
import $ from 'jquery';
import MovieView from './movie_view';

var MovieListView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    //add additional needed templates here

    this.listenTo(this.model, "update", this.render);


    this.model.fetch();
  },
  events: {
    'click #search-movies' : 'fetchMovies'
  },
  getQueryForm: function() {
    var searchTerm = this.$('#search-query').val();
    this.$('#search-query').val('');

    return searchTerm;
  },
  fetchMovies: function(e) {
    e.preventDefault();

    var searchTerm = this.getQueryForm();
    this.model.fetch({ data: $.param({ page: 1}), reset:true});
    console.log("this is " + searchTerm);

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
