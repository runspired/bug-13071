import { test } from 'qunit';
import Ember from 'ember';
import moduleForAcceptance from 'bug-13071/tests/helpers/module-for-acceptance';
import startApp from 'bug-13071/tests/helpers/start-app';

const {
  RSVP,
  run
  } = Ember;

const {
  Promise
  } = RSVP;

const RUNS = 1000;

moduleForAcceptance('Acceptance | bug trigger');

test(`attempting to trigger the bug with ${RUNS} runs of the application`, function(assert) {
  let runs = RUNS;
  let done = assert.async();
  assert.expect(runs);

  run(this.application, 'destroy');

  let application;
  let router;

  const setup = () => {
    application = startApp();
    router = application.__container__.lookup('router:main');
  };

  const teardown = () => {
    run(application, 'destroy');
  };

  const runInstance = (index) => {
    return new Promise((resolve, reject) => {
      setup();

      const throwIf = (a, b, c) => {
        if (a !== b) {
          reject();
          assert.equal(a, b, c);
          return false;
        }
        return true;
      };

      visit('/');

      andThen(() => {
        if (!throwIf(currentURL(), '/', `we transitioned ${index}`)) {
          return;
        }
        visit('/visit-1');


        andThen(() => {
          if(!throwIf(currentURL(), '/visit-1', `we transitioned ${index}`)) {
            return;
          }
          visit('/visit-2');

          andThen(() => {
            if(!throwIf(currentURL(), '/visit-2', `we transitioned ${index}`)) {
              return;
            }
            visit('/visit-3');

            andThen(() => {
              if(!throwIf(currentURL(), '/visit-3', `we transitioned ${index}`)) {
                return;
              }
              visit('/visit-4');

              andThen(() => {
                if(!throwIf(currentURL(), '/visit-4', `we transitioned ${index}`)) {
                  return;
                }
                visit('/visit-5');

                andThen(() => {
                  if(!throwIf(currentURL(), '/visit-5', `we transitioned ${index}`)) {
                    return;
                  }
                  assert.ok(`run passed ${index}`);
                  teardown();
                  resolve();
                });
              });
            });
          });
        });

      });
    });
  };

  let promises = [];
  for (let i = 0; i < runs; i++) {
    promises.push(i);
  }

  let chain = promises.reduce((chain, currentIndex) => {
    return chain
      .then(() => {
        return runInstance(currentIndex);
      });
  }, Promise.resolve());

  chain.finally(() => {
    done();
  });

});
