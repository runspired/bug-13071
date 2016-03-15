/* jshint ignore:start */
import { test } from 'qunit';
import moduleForAcceptance from 'bug-13071/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | bug trigger');

const boundVisit = visit.bind(this);
const boundCurrentURL = currentURL.bind(this);

for (let i = 0; i < 5; i++) {
  test(`visiting /bug-trigger-${i}`, function(assert) {
    assert.expect(6);
    boundVisit('/');
    assert.equal(boundCurrentURL(), '/', 'we transitioned');

    andThen(function() {
      boundVisit('/visit-1');
      assert.equal(boundCurrentURL(), '/visit-1', 'we transitioned');

      andThen(function() {
        boundVisit('/visit-2');
        assert.equal(boundCurrentURL(), '/visit-2', 'we transitioned');

        andThen(function() {
          boundVisit('/visit-3');
          assert.equal(boundCurrentURL(), '/visit-3', 'we transitioned');

          andThen(function() {
            boundVisit('/visit-4');
            assert.equal(boundCurrentURL(), '/visit-4', 'we transitioned');

            andThen(function() {
              boundVisit('/visit-5');
              assert.equal(boundCurrentURL(), '/visit-5', 'we transitioned');
            });
          });
        });
      });
    });
  });
}
/* jshint ignore:end */
