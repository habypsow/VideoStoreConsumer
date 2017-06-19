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
    this.model.fetch();
  },
  events: {
    'click #see_movie_search' : 'showForm',
    'click #search-movies' : 'fetchMovies',
    'click #see_rentals' : 'hideForm'//,
    // 'click #returnToRentalButton' : 'returnHome',
    // 'click #addRentalButton' : 'addNewRental'
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
    this.model.fetch();
  },
  // showDetails: function(model) {
  //   // this.detailsRental = model;
  //   var compiledTemplate = this.detailsTemplate({rental: model.toJSON()});
  //   this.$('#rental-details').html(compiledTemplate);
  //   if (this.rentalsShowing) {
  //     this.$('#addRentalButton').hide();
  //   }
  //   this.$('#rental-details').show();
  //   this.$('#rental-list').hide();
  //   this.$('#see_rentals').show();
  // },
  showDetails: function(rental) {
    this.$('#rental-details').empty();
    var movieDetailsView = new MovieDetailsView({
      model: rental,
      // template: _.template($('#rental-info-template').html())
      template: this.detailsTemplate
      // el: '#rental-details'
    })
    this.$('#rental-details').append(movieDetailsView.render().$el);

    // that.listenTo(movieView, "selected", this.showDetails);

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
      that.$('#rental-list').append(movieView.render().$el);
      that.listenTo(movieView, "selected", this.showDetails);
    });
    return this;
  }//,
  // returnHome: function() {
  //   this.$('#rental-details').empty();
  //   this.$('#rental-list').show();
  // },
  // addNewRental: function(model) {
  //   // var data = model.toJSON();
  //   console.log(this.model);
  //   this.model.create(this.model);
  // }
});

export default MovieListView;
