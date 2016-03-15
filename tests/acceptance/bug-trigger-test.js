/* jshint ignore:start */
import { test } from 'qunit';
import Ember from 'ember';
import moduleForAcceptance from 'bug-13071/tests/helpers/module-for-acceptance';

const {
  RSVP
  } = Ember;

const {
  Promise
  } = RSVP;

moduleForAcceptance('Acceptance | bug trigger');

test(`visiting /bug-trigger-${i}`, function(assert) {
  let runs = 5;
  assert.expect(runs);
  let done = assert.async();

  const setup = () => {};
  const teardown = () => {};

  function run(i) {
    return new Promise((resolve, reject) => {
      function throwIf(a, b, c) {
        if (a !== b) {
          reject();
          assert.equal(a, b, c);
        }
      }

      visit('/');
      throwIf(currentURL(), '/', `we transitioned ${i}`);

      andThen(function() {
        visit('/visit-1');
        throwIf(currentURL(), '/visit-1', `we transitioned ${i}`);

        andThen(function() {
          visit('/visit-2');
          throwIf(currentURL(), '/visit-2', `we transitioned ${i}`);

          andThen(function() {
            visit('/visit-3');
            throwIf(currentURL(), '/visit-3', `we transitioned ${i}`);

            andThen(function() {
              visit('/visit-4');
              throwIf(currentURL(), '/visit-4', `we transitioned ${i}`);

              andThen(function() {
                visit('/visit-5');
                throwIf(currentURL(), '/visit-5', `we transitioned ${i}`);
                assert.ok(`run passed ${i}`);
                resolve();
              });
            });
          });
        });
      });
    });
  }

  let promises = new Array(runs);
  let chain = promises.reduce(function(chain, v, i) {
    return chain
      .then(setup)
      .then(() => {
        return run(i);
      })
      .then(teardown);
  }, Promise.resolve());

  return chain.then(done);

});

/* jshint ignore:end */
