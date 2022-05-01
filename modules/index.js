import { combineReducers } from "redux";
import { all } from 'redux-saga/effects'

import register, {registerSaga} from './auth/register'
import login, {loginSaga} from './auth/login'

const rootReducer = combineReducers({
    login, register


})

export function* rootSaga() {
    yield all ([registerSaga(), loginSaga()])
}
export default rootReducer