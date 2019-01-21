import { call as callEffect } from 'redux-saga/effects';

const runningCalls = new Set();

export function* filterOncePerParams(id, [callFn, ...callParams]) {
  const identityParam = Array.isArray(id) ? id.join('-') : id;
  if(runningCalls.has(identityParam)) {
    return;
  }
  runningCalls.add(identityParam);
  try {
    yield callEffect(callFn, ...callParams);
  } catch(error) {
    console.warn(error);
  }
  runningCalls.delete(identityParam);
}

export function* callOncePerParam (id, callFnWithParams) {
  yield callEffect(filterOncePerParams, id, callFnWithParams);
}

export const getRunning = () => runningCalls.entries;

export const clearRunning = () => runningCalls.clear();
