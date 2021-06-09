import { ADD_USER } from '../../constants/action-types'
export function addUser(payload:any) {
    return{
        type:ADD_USER,
        payload
    };
}