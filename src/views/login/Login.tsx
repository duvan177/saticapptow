import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Header, Icon, Input} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {addUser} from '../../store/actions';
import {Screen} from 'react-native-screens';
import {connect} from 'react-redux';
import {userRoutes} from '../../api';
const WIDTH = Dimensions.get('window').width;
import {useForm, Controller} from 'react-hook-form';
import {ButtonBackCoomponent} from '../../components';
import {COLORS} from '../../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
function LoginSensorHumano(props: any): JSX.Element {
  const {navigation, addUser, user} = props;
  const {register, handleSubmit, control, watch , formState: { errors }} = useForm();
  const [email, setEmail]: any = useState('');
  const [password, setPassword]: any = useState('');
  const [statusLogin, setstatusLogin] = useState(false);
  interface DATALOGIN {
    email: String;
    password: String;
  }
  // const sendHome = async (): Promise<void> => {
  //   // addUser({user: username});
  //   const response = await userRoutes.login({email: email, password: password});
  //   if (!response.status) return Alert.alert('', response.data.message);
  //   addUser(response.data);
  //   // navigation.goBack();
  //   navigation.navigate('Home', {
  //     screen: 'Map',
  //   });
  // };

  const onSubmit = async ({email, password}: DATALOGIN) => {
    setstatusLogin(true);
    // Alert.alert('entré')
    const response = await userRoutes.login({email: email, password: password});
    setstatusLogin(false);
    if (!response.status) return Alert.alert('', response.data.message);
    
    const jsonValue = JSON.stringify(response.data);
    await AsyncStorage.setItem('userData', jsonValue);
    addUser(response.data);
    // navigation.goBack();
    navigation.navigate('HomeStackContainer', {
      screen: 'MapStackScreen',
    });
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ButtonBackCoomponent action={() => navigation.goBack()} />

          <View style={{flex: 1}}>
            <View style={styles.Logo}>
              <Image
                style={{width: WIDTH / 1.5, height: WIDTH / 4}}
                resizeMode="stretch"
                //   width={ }

                source={require('../../assets/logo/splash_image.png')}
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={[styles.contentButtonSubmit, {marginHorizontal: 40}]}>
              <Controller
                name="email"
                defaultValue=""
                control={control}
                render={({field: {onChange, value}}) => (
                  <Input
                    keyboardType={'email-address'}
                    underlineColorAndroid="transparent"
                    style={{}}
                    onChangeText={(text) => onChange(text)}
                    containerStyle={{}}
                    placeholder="correo"
                    leftIcon={
                      <Icon name="user" type="evilicon" color="#1A748C" />
                    }
                  />
                )}
                rules={{
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                }}
              />
              {errors.email?.type === 'required' ? (
                <Text
                  style={{
                    color: 'red',
                    marginHorizontal: 20,
                    marginTop: -20,
                    textAlign: 'left',
                  }}>
                  requerido este valor.
                </Text>
              ) : (
                <></>
              )}
              {errors.email?.type === 'pattern' ? (
                <Text
                  style={{
                    color: 'red',
                    marginHorizontal: 20,
                    marginTop: -20,
                    textAlign: 'left',
                  }}>
                  correo no válido
                </Text>
              ) : (
                <></>
              )}

              <Controller
                name="password"
                defaultValue=""
                control={control}
                render={({field: {onChange, value}}) => (
                  <Input
                    underlineColorAndroid="transparent"
                    style={{}}
                    secureTextEntry={true}
                    onChangeText={(text) => onChange(text)}
                    containerStyle={{}}
                    placeholder="contraseña"
                    leftIcon={
                      <Icon name="lock" type="evilicon" color="#1A748C" />
                    }
                  />
                )}
                rules={{required: true}}
              />
              {errors.password?.type === 'required' ? (
                <Text
                  style={{
                    color: 'red',
                    marginHorizontal: 20,
                    marginTop: -20,
                    textAlign: 'left',
                  }}>
                  requerido este valor.
                </Text>
              ) : (
                <></>
              )}
            </View>

            <View style={styles.contentButtonSubmit}>
              <TouchableOpacity
                disabled={statusLogin}
                style={[
                  styles.btnGo,
                  {
                    backgroundColor: '#25375b',
                  },
                ]}
                onPress={handleSubmit((data: any) => onSubmit(data))}>
                {!statusLogin ? (
                  <Text style={{textAlign: 'center', color: '#ffffff'}}>
                    Iniciar{' '}
                  </Text>
                ) : (
                  <ActivityIndicator color="#ffffff" size="large" />
                )}
              </TouchableOpacity>

              {/* <TouchableOpacity
                disabled={statusLogin}
                style={[
                  styles.btnGo,
                  {
                    backgroundColor: '#ee3d56',
                    marginVertical: 10,
                    borderColor: '#ee3d56',
                  },
                ]}
                onPress={() => navigation.navigate('CreateAccount')}>
                <Text style={{textAlign: 'center', color: '#ffffff'}}>
                  Registrarme{' '}
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>

          {/* </> */}

          {/* ) :(<View style={{justifyContent:"center" , alignContent:"center" , alignItems:"center", flex:1}}>
              <ActivityIndicator color="#25375b" size={50} />
              <Text>Iniciando sesion...</Text>
           </View>)
        } */}
        </View>
      </ScrollView>
    </>
  );
  //    <View style={{flex:1 , justifyContent:"center" , alignItems:"center"}}>
  //        <Text>
  //            This is profile
  //        </Text>
  //        <TouchableOpacity onPress={()=>navigation.navigate(
  //            'Login',
  //            {
  //              screen:'CreateAccount'
  //            }
  //        )}>
  //            <Text style={{color:"blue"}}>
  //                Create account
  //            </Text>
  //        </TouchableOpacity>
  //    </View>
}
const mapStateToProps = (state: any) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addUser: (user: any) => dispatch(addUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSensorHumano);

const styles = StyleSheet.create({
  Logo: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentButtonSubmit: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGo: {
    justifyContent: 'center',
    alignContent: 'center',

    borderColor: '#25375b',
    borderWidth: 2,
    height: 40,
    width: WIDTH / 2,
    borderRadius: 20,
  },
});
