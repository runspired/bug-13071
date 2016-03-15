import Ember from 'ember';

export function complexHelper2(params/*, hash*/) {
  return params;
}

export default Ember.Helper.extend({
  compute: complexHelper2
});
