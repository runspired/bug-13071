import Ember from 'ember';

export function simpleHelper2(params/*, hash*/) {
  return params;
}

export default Ember.Helper.helper(simpleHelper2);
