import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

var MovieDetailsView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
  },
  events: {
    'click #returnToRentalButton' : 'returnHome',
    'click #addRentalButton' : 'addNewRental'
  },
  attributes: {
    class: 'medium-12 columns'
    // class: 'column column-block'
  },
  render: function() {
    var compiledTemplate = this.template({rental: this.model.toJSON()});
    this.$el.html(compiledTemplate);
    return this;
  },
  addNewRental: function() {
    this.trigger("new", this.model);
  },
  returnHome: function() {
    this.trigger("home")
  }
});

export default MovieDetailsView;
