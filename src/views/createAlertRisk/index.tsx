'use strict';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Alert,
  PermissionsAndroid,
  ScrollView,
  ActivityIndicator,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
import FormAlertRisk from './components/FormAlertRisk';
import Map from './components/MapView';
// import Geolocation from 'react-native-geolocation-service';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {addUser} from '../../store/actions';
import {connect} from 'react-redux';
import {ROUTES} from '../../api';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface dataForm {
  coordenadas: any;
  descripcion: any;
  nivel_riesgo: any;
  tp_riesgo: any;
  foto_riesgo: any;
}

const HEIGHT = Dimensions.get('window').height;

const INFOALERT: any = {
  coordenadas: 'Coordenadas',
  descripcion: 'Descripción',
  nivel_riesgo: 'Nivel de riesgo',
  tp_riesgo: 'Tipo de riesgo',
  foto_riesgo: 'Foto riesgo',
};
const HEADER_HEIGHT = HEIGHT - HEIGHT * 0.25;
function index(props: any) {
  const {navigation, user} = props;
  const offset = useRef(new Animated.Value(0)).current;
  const [coordenadas, setCoordenadas] = useState({});
  const [statusGeo, setStatusGeo] = useState(false);
  const [data, setData] = useState<any>({
    coordenadas: null,
    descripcion: null,
    nivel_riesgo: null,
    tp_riesgo: null,
    foto_riesgo: null,
  });

  const [statusSendInfo, setStatusSendInfo] = useState(false);

  const findCoordinates = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    // const gpsios =  Geolocation.requestAuthorization();
    // console.log('gps ios' , gpsios);

    // if (!(granted === PermissionsAndroid.RESULTS.GRANTED)) {
    //   Alert.alert(
    //     'Error en ubicación',
    //     'revisa si la ubicacíon GPS esta activada',
    //   );
    //   return;
    // }
    setStatusGeo(true);
    Geolocation.getCurrentPosition((info: any) => {
      const {latitude: lat, longitude: lng} = info.coords;
      setCoordenadas({lat, lng});
      setStatusGeo(false);
    });
    //  await Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      (position: any) => {
        const initialPosition: any = JSON.stringify(position);
        const {latitude: lat, longitude: lng} = position.coords;
        setCoordenadas({lat, lng});
        // console.log('posicion',coordenadas);
        setStatusGeo(false);
      },
      (error: any) => {
        Alert.alert(
          'Error',
          'No se pudo obtener tu ubicación, intenta activar el gps o seleciona un punto de ubicación en el mapa e intenta nuevamente.',
        );
        setStatusGeo(false);
      },
      {timeout: 30000},
    );
    // Geolocation.watchPosition((position: any): void => {
    //   const lastPosition = JSON.stringify(position);
    //   console.log(lastPosition);
    // });
  };

  const setDataForm = async () => {
    const validate = Object.keys(data);
    const input: Array<any> = [];
    validate.map(item => {
      if (data[item] == null) {
        input.push({item: item});
      }
    });
    console.log(validate, input, data);
    if (input.length > 0 ) {

      Alert.alert(
        '',
        'Todos los campos son requeridos, verifica e intenta nuevamente.',
      );
      return;
    }
    if( !(data['descripcion']?.replace(/\s/g, '').length > 0)){
      Alert.alert(
        '',
        'Descripción inválida verifica e intenta nuevamente.',
      );
      return;
    }
    setStatusSendInfo(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'foto_riesgo') {
        formData.append(key, value);
      }
    });

    formData.append('urlFoto', data.foto_riesgo);

    // console.log('data preparada', formData);
    let response: any = await axios
      .post(ROUTES.NEWTICKET, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': user.token,
        },
        timeout: 10000,
      })
      .catch(e => {
        setStatusSendInfo(false);

        Alert.alert(
          'Problema al generar alerta',
          'espera unos minutos y intenta nuevamente.',
        );
        console.log('error', e);
      });
    setStatusSendInfo(false);

    // console.log(response)
    if (response.status == 200) {
      Alert.alert(
        'Alerta generada',
        'su alerta a sido enviada con éxito y pronto será atendida. Gracias!',
      );
      navigation.goBack();
    }
    // console.log('data para enviar'  , response.status)
  };

  useEffect(() => {
    Object.keys(user).length == 0 && navigation.push('MapInfo');
  }, [user]);

  const insets = useSafeAreaInsets();
  const opacity = offset.interpolate({
    inputRange: [0, 200],
    outputRange: [0.9, 0.1],
    extrapolate: 'clamp',
  });
  const headerHeight = offset.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT, 20],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        {!(Object.keys(user).length == 0) ? (
          !statusSendInfo ? (
            <>
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  // marginBottom:300,

                  zIndex: 10,
                  height: headerHeight,
                  // backgroundColor: 'lightblue',
                  // justifyContent:"center" ,
                  // alignItems:"center",
                  width: '100%',
                }}>
                <>
                  <Map
                    data={data}
                    setData={setData}
                    setCoordenadas={setCoordenadas}
                    coordenadas={coordenadas}
                  />
                </>
              </Animated.View>

              <ScrollView
                style={{flex: 1, backgroundColor: ''}}
                scrollEventThrottle={1}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {y: offset}}}],
                  {useNativeDriver: false},
                )}>
                <FormAlertRisk
                  setDataForm={setDataForm}
                  data={data}
                  setData={setData}
                  statusGeo={statusGeo}
                  {...navigation}
                  findCoordinates={findCoordinates}
                />
              </ScrollView>
            </>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                flex: 1,
              }}>
              <ActivityIndicator color={'#25375b'} size={50} />
              <Text style={{textAlign: 'center', marginVertical: 30}}>
                Tu alerta se esta generando...
              </Text>
            </View>
          )
        ) : (
          <></>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
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
export default connect(mapStateToProps, mapDispatchToProps)(index);
