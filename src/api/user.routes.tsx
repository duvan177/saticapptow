import axios from 'axios';
import {ROUTES} from './apiRoutes.routes';
interface DATA  {
  email : String , 
  password:String
}

import instanceAxios from '../tools/axiosConfig'
export const login = async ({email, password } : DATA) => {
  console.log('ruta login' ,ROUTES.LOGIN )
  try {
    const response = await axios.post(ROUTES.LOGIN , {
      email , 
      password
    } , {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    return {
      status:true,
      data:response.data
    };
  } catch (error:any) {
    
    return {
      status:false,
      data:error.response.data
    }
  }
};

export const registerSensorHuman = async (data: any) => {
  try {

    const response = await axios.post(ROUTES.REGISTERSENSORCITIZEN,
      data,
    );
    return {
      status:true,
      data:response.data
    }

  } catch (error) {

    return {
      status: false,
    
    }
    
  }
} 

export const alertsRisk = async () => {
  try {

    const response = await axios.get(ROUTES.GETALERTSRISK);
    return {
      status:true,
      data:response.data
    }

  } catch (error:any) {

    return {
      status: false,
      data:error.response
    }
    
  }
}


export const alertsRiskByUser = async () => {
  try {
    const AxiosConfig = await instanceAxios();
    const response = await AxiosConfig.get(ROUTES.GETMEALERTRISK);
    return {
      status:true,
      data:response.data
    }

  } catch (error: any) {
    console.log(error)
    return {
      status: false,
      data:error.response
    }
    
  }
}


export const historyDataStation = async (id: number) => {
  try {
    // const AxiosConfig = await instanceAxios();
    const response = await axios.get(ROUTES.GETHISTORYSTATION(id));
    console.log(response)
    return {
      status:true,
      data:response.data
    }

  } catch (error: any) {
    return {
      status: false,
      data:error.response
    }
    
  }
}

