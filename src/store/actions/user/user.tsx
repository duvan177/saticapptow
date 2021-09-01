import { ADD_RISK_USER, ADD_USER } from '../../constants/action-types'
export function addUser(payload:any) {
    return{
        type:ADD_USER,
        payload
    };
}

export function addRiskUser(payload:any) {
    return{
        type:ADD_RISK_USER,
        payload
    };
}
