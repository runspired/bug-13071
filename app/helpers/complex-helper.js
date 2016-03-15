import Ember from 'ember';

export function complexHelper(params/*, hash*/) {
  return params;
}

export default Ember.Helper.extend({
  compute: complexHelper
});
