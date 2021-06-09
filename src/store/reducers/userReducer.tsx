import { ADD_USER} from '../constants/action-types'

interface initial{
    user:any
}

const initialState :initial =  {
    user: {}
}

const userReducer = ( state = initialState , action:any ) =>{

    if(action.type == ADD_USER){
        return Object.assign({}, state , {
            user : state.user = action.payload
        });
    }
    return state;

}

export default userReducer