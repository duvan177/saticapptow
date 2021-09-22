import {call, put, takeLatest, select} from 'redux-saga/effects';
import * as actionTypes from '../constants/action-types';

import * as action from '../actions';
import Axios from 'axios';
import { AnyAction } from 'redux';
import { userRoutes } from '../../api'
const delay = (ms:any) => new Promise(res => setTimeout(res, ms))
interface IResponse {
    data?: any;
}
export default function* sagas() {
  yield takeLatest(actionTypes.ADD_USER, getRisk);
}

function* getRisk({payload}: any) {
  try {
    console.log('entré proceso sagas' , payload);
    const response: IResponse = yield call(userRoutes.alertsRisk);
    const responseRisksByUser :IResponse = yield call(userRoutes.alertsRiskByUser)
    yield put(action.addRisks(response.data))
    yield put(action.addRiskUser(responseRisksByUser.data))
    
    console.log('riesgos by user' , responseRisksByUser)
  } catch (error) {
      console.log(error)
  }
}



