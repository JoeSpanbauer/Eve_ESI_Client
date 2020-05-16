import {
  authorize,
  authorizeAsync,
  authenticate,
  authenticateAsync,
  requestFailed,
} from './sagas';
import { REQUEST_FAILED } from '../actions/actionTypes';

describe('Authorize Sagas', () => {
  test('that authorizeAsync function calls the authorize function', () => {
    const gen = authorizeAsync();
    let functionCalled;
    let result;
    do {
      result = gen.next();
      const { value } = result;
      if (value && value.payload && value.payload.fn) {
        functionCalled = value.payload.fn;
        break;
      }
    } while (result.done === false);
    expect(functionCalled).toEqual(authorize);
  });

  test('that authorizeAsync fails with REQUEST_FAILED type and requestFailed error', () => {
    const gen = authorizeAsync();
    let lastAction;
    let result;
    do {
      result = gen.next();
      const { value } = result;
      if (value && value.payload && value.payload.action) {
        lastAction = value.payload.action;
      }
    } while (result.done === false);

    expect(lastAction.type).toEqual(REQUEST_FAILED);
    expect(lastAction.value).toEqual(requestFailed);
  });
});

describe('Authenticate Sagas', () => {
  test('that authenticateAsync function calls the authenticate function', () => {
    const gen = authenticateAsync({}, { payload: { code: '' } });
    let functionCalled;
    let result;
    do {
      result = gen.next();
      const { value } = result;
      if (value && value.payload && value.payload.fn) {
        functionCalled = value.payload.fn;
        break;
      }
    } while (result.done === false);
    expect(functionCalled).toEqual(authenticate);
  });

  test('that authenticateAsync fails with REQUEST_FAILED type and requestFailed error', () => {
    const gen = authenticateAsync({}, { payload: { code: '' } });
    let lastAction;
    let result;
    do {
      result = gen.next();
      const { value } = result;
      if (value && value.payload && value.payload.action) {
        lastAction = value.payload.action;
      }
    } while (result.done === false);

    expect(lastAction.type).toEqual(REQUEST_FAILED);
    expect(lastAction.value).toEqual(requestFailed);
  });
});
