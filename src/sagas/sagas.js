
import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  REQUEST_FAILED,
  AUTHORIZE,
  AUTHENTICATE,
  LOGIN_SUCCESS,
} from '../actions/actionTypes';
import { serverUrl } from '../config';

import 'regenerator-runtime/runtime';

export const requestFailed = 'The request has failed.';

const newAction = (type, value) => ({ type, value });

export function authorize() {
  return axios.get(`${serverUrl}/authorize`);
}

export function* authorizeAsync() {
  try {
    const res = yield call(authorize);
    if (!res) {
      throw (requestFailed);
    }
    const { url } = res.data;
    window.location.href = url;
  } catch (error) {
    yield put(newAction(REQUEST_FAILED, requestFailed));
  }
}

export function authenticate(code) {
  return axios.get(`${serverUrl}/authenticate?code=${code}`);
}

export function* authenticateAsync(type, action) {
  const { payload: { code } } = action;
  try {
    const res = yield call(authenticate, code);
    if (!res) {
      throw (requestFailed);
    }
    const { authorization } = res.headers;
    axios.defaults.headers.common.Authorization = authorization;
    yield put(newAction(LOGIN_SUCCESS));
  } catch (error) {
    yield put(newAction(REQUEST_FAILED, requestFailed));
  }
}

export default function* watchCalls(type, action) {
  yield takeEvery(AUTHORIZE, authorizeAsync);
  yield takeEvery(AUTHENTICATE, authenticateAsync, action);
}
