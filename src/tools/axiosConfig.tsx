import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
// import { useSelector } from 'react-redux';
var user: any = null;
const getuser = async () =>  {
    const result: any =   await AsyncStorage.getItem('userData')
    user = JSON.parse(result)
}  


const axiosInstance = async () => {
  
      
    await getuser();
    console.log('entré al axios ' , user)
    const instance = axios.create();
    // const TOKEN = 
    // // console.log(TOKEN)
   
    instance.defaults.headers.common['x-access-token'] = user?.token;
    return instance;
}

export default axiosInstance;