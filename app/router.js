import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('visit-1');
  this.route('visit-2');
  this.route('visit-3');
  this.route('visit-4');
  this.route('visit-5');
});

export default Router;
