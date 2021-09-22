import { ADD_RISK} from '../constants/action-types'

interface initial{
    risks:any
}

const initialState :initial =  {
    risks: []
}

const riskReducer = ( state = initialState , action:any ) =>{

    if(action.type == ADD_RISK){
        return Object.assign({}, state , {
            risks : state.risks = action.payload
        });
    }
    return state;

}

export default riskReducer