import Backbone from 'backbone';
import $ from 'jquery';
import MovieView from './movie_view';

var MovieListView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.detailsTemplate = params.detailsTemplate;
    this.$('#rental-details').hide();
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

    var query = this.getQueryForm();
    this.model.fetch({ data: $.param({query})});
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
      this.listenTo(movieView, "selected", this.showDetails);
    });
    return this;
  },
  showDetails: function(model) {
    this.detailsRental = model;
    var compiledTemplate = this.detailsTemplate({rental: model.toJSON()});
    this.$('#rental-details').html(compiledTemplate);
    this.$('#rental-details').show();
    this.$('#rental-list').hide();
  }
});

export default MovieListView;
