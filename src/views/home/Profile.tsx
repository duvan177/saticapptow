import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {addUser} from '../../store/actions';
import {StackActions, NavigationAction} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const WIDTH = Dimensions.get('window').width;
function Profile(props: any) {
  const {navigation, addUser, user} = props;
  const getDate = () => {
    let date = new Date();
    console.log(date.getHours());
  };
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      addUser({});
      navigation.goBack();
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getDate();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ImageBackground
        resizeMode={'contain'}
        source={require('../../assets/images/fondo1.png')}
        style={styles.image}>
        <View style={{flex: 1}}>
          <View style={styles.Logo}>
            <Image
              resizeMode="stretch"
              //   width={ }

              source={require('../../assets/logo/user.png')}
            />
          </View>
        </View>
        <View style={{flex: 2}}>
          <View style={[styles.contentButtonSubmit, {marginHorizontal: 10}]}>
            {Object.keys(user).length > 0 ? (
              <>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    marginVertical: 10,
                  }}>
                  {`${user.data[0].PRIMER_NOMBRE} ${user.data[0].PRIMER_APELLIDO}  `}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    marginVertical: 10,
                  }}>
                  Correo: {user.data[0].EMAIL}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    marginVertical: 10,
                  }}>
                  Celular: {user.data[0].CELULAR || 'No registrado'}
                </Text>
              </>
            ) : (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  marginVertical: 10,
                }}></Text>
            )}
          </View>

          <View style={styles.contentButtonSubmit}>
            {Object.keys(user).length > 0 ? (
              <TouchableOpacity
                style={[
                  styles.btnGo,
                  {
                    backgroundColor: '#ee3d56',
                    marginVertical: 10,
                    borderColor: '#ee3d56',
                  },
                ]}
                onPress={() => logout()}
                >
                <Text style={{textAlign: 'center', color: '#ffffff'}}>
                  Cerrar Sesión
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.btnGo, {backgroundColor: '#25375b'}]}
                onPress={() =>
                  navigation.navigate('LoginStackContainer', {
                    screen: 'Login',
                  })
                }>
                <Text style={{textAlign: 'center', color: '#ffffff'}}>
                  Inicar
                </Text>
              </TouchableOpacity>
            )}

            {/*      
         <Image
             
             resizeMode="stretch"
             //   width={ }
             
             source={require('../../assets/images/fondo1.png')}
             />
           */}
          </View>
        </View>
      </ImageBackground>
    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

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
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
