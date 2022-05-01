import { createAction, handleActions } from 'redux-actions';
import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios'
import {SERVER, headers} from "@/modules/auth/server"

// 상태 초기값
export const initialState = {
    isRegistered: false
}
// 액션타입
const REGISTER_REQUEST = 'auth/REGISTER_REQUEST';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

// 액션생성함수

export const registerRequest = createAction(REGISTER_REQUEST, data => data)

// 사가 와쳐

export function* registerSaga(){
    yield takeLatest(REGISTER_REQUEST, signup)
}

// 사가 로직

function* signup(action){
    try {
        console.log(" **** 여기가 핵심 *** "+JSON.stringify(action))
        const response = yield call(registerAPI, action.payload)
        console.log(" 회원가입 서버다녀옴: " + JSON.stringify(response.data))
        const ok = response.data.ok
        if(ok === 'ok'){
            yield put({type: REGISTER_SUCCESS, payload: response.data})
            yield put((window.location.href = "/auth/login"));
        }else{
            yield put({type: REGISTER_FAILURE, payload: error.message})
        }
    } catch (error) {
        yield put({type: REGISTER_FAILURE, payload: error.message})
    }
}

// API

const registerAPI = payload => axios.post(
    `${SERVER}/user/join`,
    payload,
    {headers}
)

// 리듀서
/** 
const register = (state=initialState, action) => {
    switch(action.type){
        case REGISTER_SUCCESS: return {...state, isRegistered: true}
        case REGISTER_FAILURE: return {...state, isRegistered: false}
        default:
            return state
    }
}*/
const register = handleActions({
    [REGISTER_SUCCESS]: (state,_action) => ({...state, isRegistered: true}),
    [REGISTER_FAILURE]: (state,_action) => ({...state, isRegistered: false}),
}, initialState)
export default register