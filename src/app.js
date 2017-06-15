// /src/app.js

// Import jQuery & Underscore
import $ from 'jquery';
import _ from 'underscore';
import MovieList from './collections/movie_list';
import MovieListView from './views/movie_list_view';

var rentalLibraryList = new MovieList({});

var rentalLibraryListView = new MovieListView({
  model: rentalLibraryList,
  template: _.template($('#rental-card-template').html()),
  el: 'body',
  detailsTemplate: _.template($('#rental-info-template').html())
});
// ready to go
$(document).ready(function() {

  rentalLibraryListView.hideForm();
  rentalLibraryListView.render();

});
