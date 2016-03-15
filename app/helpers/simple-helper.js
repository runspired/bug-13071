import Ember from 'ember';

export function simpleHelper(params/*, hash*/) {
  return params;
}

export default Ember.Helper.helper(simpleHelper);
