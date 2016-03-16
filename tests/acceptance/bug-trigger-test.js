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

const RUNS = 500;
const ROUTE_INTERVAL = 100;

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

    const throwIf = (a, b, c) => {
      if (a !== b) {
        reject();
        assert.equal(a, b, c);
        return false;
      }
      return true;
    };

    const visitRoute = (path) => {
      return new Promise((resolve, reject) => {
        run.later(() => {
          visit(path);
          andThen(() => {
            if (!throwIf(currentURL(), path, `we transitioned ${index}`)) {
              return reject();
            }
            resolve();
          });
        }, ROUTE_INTERVAL);
      });
    };

    setup();

    return visitRoute('/')
      .then(() => { return visitRoute('/visit-1'); })
      .then(() => { return visitRoute('/visit-2'); })
      .then(() => { return visitRoute('/visit-3'); })
      .then(() => { return visitRoute('/visit-4'); })
      .then(() => { return visitRoute('/visit-5'); })
      .then(() => {
        assert.ok(`run passed ${index}`);
        return teardown();
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
