import { ADD_USER , ADD_RISK_USER} from '../constants/action-types'

interface initial{
    user:any ,
    risks: []
}

const initialState :initial =  {
    user: {},
    risks:[]
}

const userReducer = ( state = initialState , action:any ) =>{

    if(action.type == ADD_USER){
        return Object.assign({}, state , {
            user : state.user = action.payload
        });
    }
    if (action.type == ADD_RISK_USER) {
        return Object.assign({}, state , {
            risks : state.risks = action.payload
        });
    }
    return state;

}

export default userReducer