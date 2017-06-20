import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import MovieView from './movie_view';
import MovieDetailsView from './movie_details_view';

var MovieListView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.detailsTemplate = params.detailsTemplate;
    var rentalsShowing = true;
    this.$('#rental-details').hide();
    this.listenTo(this.model, "update", this.render);
    this.model.fetch({
      error: this.fetchFail
    });
  },
  events: {
    'click #see_movie_search' : 'showForm',
    'click #search-movies' : 'fetchMovies',
    'click #see_rentals' : 'hideForm',

  },
  showForm: function() {
    $('#see_movie_search').hide();
    $('#see_rentals').show();
    this.hideDetails();
    $('form').show();
    this.rentalsShowing = false;
  },
  hideForm: function() {
    $('#see_movie_search').show();
    $('#see_rentals').hide();
    this.hideDetails();
    $('form').hide();
    this.rentalsShowing = true;
    this.model.fetch({
      error: this.fetchFail
    });
  },
  showDetails: function(rental) {
    this.$('#rental-details').empty();
    var movieDetailsView = new MovieDetailsView({
      model: rental,
      template: this.detailsTemplate
    });
    this.$('#rental-details').append(movieDetailsView.render().$el);

    this.listenTo(movieDetailsView, "new", this.addNewRental);
    this.listenTo(movieDetailsView, "home", this.returnHome);

    if (this.rentalsShowing) {
      this.$('#addRentalButton').hide();
    }
    this.$('#rental-details').show();
    this.$('#rental-list').hide();
    this.$('#see_rentals').show();
  },
  hideDetails: function() {
    this.$('#rental-details').hide();
    this.$('#rental-list').show();
  },
  getQueryForm: function() {
    var searchTerm = this.$('#search-query').val();
    this.$('#search-query').val('');
    return searchTerm;
  },
  fetchMovies: function(e) {
    e.preventDefault();
    this.hideDetails();
    this.$('#rental-list').show();

    var query = this.getQueryForm();
    if (!query) {
      $("#message").html("<h4>A search term is needed.</h4>");
    } else {
      this.model.fetch({ data: $.param({query}),

      success: this.fetchSuccess,
      error: this.fetchFail
    });
  }
},
render: function() {
  this.$('#rental-list').empty();
  this.$('#message').empty();
  var that = this;
  this.model.each((rental) => {
    var movieView = new MovieView({
      model: rental,
      template: that.template
    });
    that.$('#rental-list').append(movieView.render().$el);
    that.listenTo(movieView, "selected", this.showDetails);
  });
  return this;
},
returnHome: function() {
  this.$('#rental-details').empty();
  this.$('#rental-list').show();
},
fetchSuccess: function(collection) {
  if (collection.length === 0) {
    $("#message").html("<h4>The search had no results.</h4>");
  }
},
fetchFail: function(data){
  $("#message").html("<h4>Unfortunately your request could not be completed.</h4>");
},
addNewRental: function(model) {

  var newRental =
  model.save(null, {
    success: function(model, response) {
      $("#message").html("<h3>Movie successfully added to Video Store</h3>");
      console.log("I am in success!!");
    }
  });
  this.model.push(newRental);
  this.$('#rental-details').empty();
  this.$('#rental-list').show();
  // this.model.fetch();
},
});

export default MovieListView;
