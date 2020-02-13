import { all, fork, takeLatest, takeEvery, call, put, take, delay } from 'redux-saga/effects';
import axios from 'axios';

// 회원가입
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
// 로그인
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
// 로그아웃
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

function logInAPI(loginData) {
  return axios.post('/users/signin', loginData, {
    // withCredentials: true, // back과 front가 cookie를 주고 받을수 있게 함
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data); // call: 함수 동기적 호출
    yield put({ // put: 액션 dispatch
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({type: LOG_IN_FAILURE});
  }
}

function* watchlogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn)
}

export function* userSaga() {
  yield all([
    // fork: 함수 비동기적 호출
    fork(watchlogIn), 
  ]);
}

export const initialState = {
  isLogin: false,
}

export default function userReducer(state=initialState, action) {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLogin: true,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        isLogin: false,
      }
    case SIGN_UP_REQUEST:
      return {
        ...state,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
      }
    case LOG_OUT_FAILURE:
      return {
        ...state,
      }
    default:
      return state;
  }
}