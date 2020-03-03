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
// 로그인 체크
export const LOG_IN_CHECK_REQUEST = 'LOG_IN_CHECK_REQUEST';
export const LOG_IN_CHECK_SUCCESS = 'LOG_IN_CHECK_SUCCESS';
export const LOG_IN_CHECK_FAILURE = 'LOG_IN_CHECK_FAILURE';

// 로그인
function logInAPI(loginData) {
  return axios.post('/users/signin', loginData);
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

// 로그아웃
function* logOut() {
  try {
    yield put({ type: LOG_OUT_SUCCESS });
  } catch (e) {
    console.error(e);
    yield put({ type: LOG_OUT_FAILURE });
  }
}
function* watchlogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut)
}

// 로그인 체크
function logInCheckAPI(token) {
  return axios({
    method: "get",
    url: "/users/tokken-check",
    headers: { Authorization: token },
  })
}
function* logInCheck(action) {
  try {
    const result = yield call(logInCheckAPI, action.data); // call: 함수 동기적 호출
    console.log('logInCheck', result)
    yield put({ // put: 액션 dispatch
      type: LOG_IN_CHECK_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({type: LOG_IN_CHECK_FAILURE});
  }
}
function* watchlogInCheck() {
  yield takeEvery(LOG_IN_CHECK_REQUEST, logInCheck)
}

export function* userSaga() {
  yield all([
    // fork: 함수 비동기적 호출
    fork(watchlogIn), 
    fork(watchlogInCheck), 
    fork(watchlogOut), 
  ]);
}

export const initialState = {
  isLogin: false,
  token: '',
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
        token: action.data.token,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        isLogin: false,
        token: '',
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
        isLogin: false,
        token: '',
      }
    case LOG_OUT_FAILURE:
      return {
        ...state,
      }
    case LOG_IN_CHECK_REQUEST:
      return {
        ...state,
      }
    case LOG_IN_CHECK_SUCCESS:
      return {
        ...state,
        isLogin: true,
      }
    case LOG_IN_CHECK_FAILURE:
      return {
        ...state,
        isLogin: false,
      }
    default:
      return state;
  }
}