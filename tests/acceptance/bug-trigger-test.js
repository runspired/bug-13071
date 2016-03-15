import { test } from 'qunit';
import moduleForAcceptance from 'bug-13071/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | bug trigger');

test('visiting /bug-trigger', function(assert) {
  visit('/bug-trigger');

  andThen(function() {
    assert.equal(currentURL(), '/bug-trigger');
  });
});
