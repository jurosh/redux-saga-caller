import createSagaMiddleware from 'redux-saga';
import { delay, all, fork, call } from 'redux-saga/effects';
import { callOncePerParam } from './index';

function* fakeSaga(action) {
  console.log("Starting", action.order);
  yield delay(action.fakeDelay);
  console.log("Fake saga done", action.order);
}

function* testSaga() {
  console.log('Running...')
  yield all([
    callOncePerParam(["FAKE_SAGA", 1], [fakeSaga, { fakeDelay: 2000, order: 1 }]),
    callOncePerParam(["FAKE_SAGA", 1], [fakeSaga, { fakeDelay: 2000, order: 2 }]),
    callOncePerParam(["FAKE_SAGA", 2], [fakeSaga, { fakeDelay: 1500, order: 3 }]),
    callOncePerParam(["FAKE_SAGA", 2], [fakeSaga, { fakeDelay: 100, order: 4 }]),
    callOncePerParam(["FAKE_SAGA", 1], [fakeSaga, { fakeDelay: 2000, order: 5 }])
  ]);
  yield delay(100);
  yield callOncePerParam(["FAKE_SAGA", 1], [fakeSaga, { fakeDelay: 100, order: 6 }]);
  // Expected output:
    // Running...
    // Starting 1
    // Starting 3
    // Fake saga done 3
    // Fake saga done 1
    // Starting 6
    // Fake saga done 6
}

const sagaMiddleware = createSagaMiddleware();
sagaMiddleware({ getState: () => ({})});

sagaMiddleware.run(testSaga);

setTimeout(() => {}, 3000)