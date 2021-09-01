import { ADD_RISK } from '../../constants/action-types'
export function addRisks(payload:any) {
    return{
        type:ADD_RISK,
        payload
    };
}