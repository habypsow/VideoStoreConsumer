import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

var MovieDetailsView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
  },
  events: {
    // 'click #returnToRentalButton' : 'returnHome',
    'click #addRentalButton' : 'addNewRental'
  },
  render: function() {
    var compiledTemplate = this.template({rental: this.model.toJSON()});
    this.$el.html(compiledTemplate);
    return this;
  },
  addNewRental: function() {
    var data = this.model.toJSON();
    console.log(data);
    this.model.create(data);
  }

});

export default MovieDetailsView;
