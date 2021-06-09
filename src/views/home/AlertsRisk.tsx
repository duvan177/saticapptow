import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  View,
  RefreshControl,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import {Button, Card, Icon} from 'react-native-elements';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {userRoutes} from '../../api';
import DeviceInfo from 'react-native-device-info';
// import moment from 'moment'
import moment from 'moment';
import 'moment/locale/es';
import Carousel from 'react-native-snap-carousel';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { addUser } from '../../store/actions';
import { connect } from 'react-redux';
// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: Platform.OS === 'ios',
});

const IMGRISK = [
  {
    on: require(`../../assets/images/risk/INCENDIOOn.png`),
    off: require(`../../assets/images/risk/INCENDIOOff.png`),
    status: false,
    value: 23,
  },
  {
    on: require(`../../assets/images/risk/INUNDACIONOn.png`),
    off: require(`../../assets/images/risk/INUNDACIONOff.png`),
    status: false,
    value: 24,
  },
  {
    on: require(`../../assets/images/risk/DESLIZAMIENTOOn.png`),
    off: require(`../../assets/images/risk/DESLIZAMIENTOOff.png`),
    status: false,
    value: 25,
  },
  {
    on: require(`../../assets/images/risk/INCENDIOFORESTALOn.png`),
    off: require(`../../assets/images/risk/INCENDIOFORESTALOff.png`),
    status: false,
    value: 27,
  },
  {
    on: require(`../../assets/images/risk/SISMOOn.png`),
    off: require(`../../assets/images/risk/SISMOOff.png`),
    status: false,
    value: 26,
  },
];

const DATATEST = [
  {
    title: 'Alerta 1',
    text: 'descripcion del riesgo 1',
  },
  {
    title: 'Alerta 2',
    text: 'descripcion del riesgo 2',
  },
  {
    title: 'Alerta 3',
    text: 'descripcion del riesgo 3',
  },
  {
    title: 'Alerta 4',
    text: 'descripcion del riesgo 4',
  },
  {
    title: 'Alerta 5',
    text: 'descripcion del riesgo 5',
  },
];

const setItemImage = (id: any) => {
  const risk = IMGRISK.filter((item) => item.value == id);

  console.log(risk);
  return risk[0]?.['on'];
};

const Item = ({title, description, id, idTypeRisk, date, action}: any) => (
  <TouchableOpacity
    activeOpacity={1}
    style={{
      backgroundColor: '#f7f7f7',
      height: 100,
      marginVertical: hp('1%'),
      justifyContent: 'space-around',
      flexDirection: 'row',
      marginHorizontal: wp('5%'),
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    }}>
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          // style={styles.tinyLogo}
          resizeMode="stretch"
          style={{width: 40, height: 40}}
          source={setItemImage(idTypeRisk)}
        />
      </View>

      <View style={{flex: 2, justifyContent: 'center'}}>
        <Card.Title style={{textAlign: 'left' , fontWeight:"bold"}}>{title} </Card.Title>
        <Text style={{marginBottom: 10, color: '#7a7a7a'}}>
          {moment(date).locale('es').format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Icon
          name="chevron-right"
          type="material-community"
          color="gray"
          size={33}
          onPress={() => action()}
        />
      </View>
    </View>

    {/* <Card key={`${id}`}>
      <Card.Title style={{textAlign: 'left'}}>{title} </Card.Title>
      <Card.Divider />
      <View
        style={{
          justifyContent: 'space-around',
          padding: 10,
          flexDirection: 'row',
        }}>
        <Text style={{marginBottom: 10}}>{description}</Text>
        <Icon reverse size={15} name="alert" type="ionicon" color="red" />
      </View>
 
    </Card> */}
  </TouchableOpacity>
);

const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function alertsRisk({navigation , user}: any) {
  const [risks, setRisks] = useState([]);
  const [statusGetRisks, setStatusGetRisks] = useState(true);
  // const [refreshing, setrefreshing] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [meAlerts, setMeAlerts] = useState([]);
  const getRisks = async () => {
    // setrefreshing(true);
    const responseMeAlerts = await userRoutes.alertsRiskByUser();
    responseMeAlerts.status && setMeAlerts(responseMeAlerts.data);

    console.log('mis alertas', responseMeAlerts);
    const response = await userRoutes.alertsRisk();

    // setrefreshing(false);
    setStatusGetRisks(false);

    response.status
      ? setFilterData(response.data)
      : Alert.alert(
          '',
          'error en obtener información, espera unos minutos. Gracias',
        );
    console.log('alertas', response);
  };
  const setFilterData = (data: any) => {
    const filterAlerts = data.filter((item: any) => item.ID_ESTADO === 43);
    // !(risks.length == filterAlerts.length) && notifi();
    setRisks(filterAlerts);
    console.log(filterAlerts);
  };
  const navigateDetail = (data: any) =>
    navigation.navigate('AlertRiskStackContainer', {
      screen: 'AlertRiskDetail',
      params: {detail: data},
    });

  const notifi = () => {
    try {
      PushNotification.localNotification({
        title: 'Alerta Satic',
        message: 'Se ha registrado una alerta cerca de tí.',
      });
    } catch (error) {
      console.log(error);
    }
    console.log('alerta iniciada');
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(async () => {
      getRisks();
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    getRisks();
    console.log('redux' , user)
  }, []);

  const notificacion = () => {
    console.log('entré a notificaciones');
  };

  const renderItem = ({item}: any) => (
    <Item
      action={() => navigateDetail(item)}
      key={`${item.ID_TICKET}`}
      id={item.ID_TICKET}
      title={item.RIESGO}
      idTypeRisk={item.TIPO_RIESGO}
      description={item.DESCRIPCION_TICKET}
      date={item.FECHA_CREA}
    />
  );
  useEffect(() => {
    console.log(moment.locale());
    // setTimeout(() => {
    //   notifi()
    // }, 5000);
  }, []);

  const _renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigateDetail(item)}
        style={{
          backgroundColor: '#1447ad',
          borderRadius: 20,
          height: hp('18%'),
          padding: wp('5%'),
          marginLeft: 25,
          marginRight: 25,
          marginBottom: 100,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.48,
          shadowRadius: 11.95,

          elevation: 18,
        }}>
        <Text style={{fontSize: 15, color: 'white'}}>{item.RIESGO}</Text>
        <Text style={{color: 'white', fontSize: 15, marginVertical: 10}}>
          Estado: {item.ESTADO_ALARMA}
        </Text>
        <Text style={{color: 'white', fontSize: 14}}>
          Fecha: {moment(item.FECHA_CREA).format('YYYY MM DD HH:mm a')}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
          }}
          refreshControl={
            <RefreshControl
              style={{justifyContent: 'center'}}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            {statusGetRisks ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <ActivityIndicator color={'#1447ad'} size={50} />
                <Text style={{textAlign: 'center'}}>Obteniendo alertas...</Text>
              </View>
            ) : (
              <>
              {
                Object.values(user).length > 0 && (
                   <View
                  style={{
                    height: hp('35%'),
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      marginBottom: 10,
                      marginTop: 40,
                      marginHorizontal: 20,
                      fontWeight: 'bold',
                      color: '#9b9b9b',
                    }}>
                    Mis alertas
                  </Text>
                  <Carousel
                    contentContainerStyle={{
                      width: 100,
                      shadowColor: '#343a40',
                      shadowOffset: {
                        width: 0,
                        height: 13,
                      },
                      shadowOpacity: 0.35,
                      shadowRadius: 14.3,
                    }}
                    layout={'default'}
                    inactiveSlideScale={0.7}
                    indicatorStyle={'black'}
                    contentContainerCustomStyle={{}}
                    // ref={(ref) => (this.carousel = ref)}
                    data={meAlerts}
                    itemHeight={400}
                    sliderHeight={hp('20%')}
                    sliderWidth={400}
                    itemWidth={250}
                    renderItem={_renderItem}
                    // onSnapToItem={(index) => setState({activeIndex: index})}
                  />
                </View>

                )
              }
               
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 10,
                    marginTop: hp('1%'),
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                    color: '#9b9b9b',
                  }}>
                  Alertas recientes
                </Text>
                <FlatList
                  data={risks}
                  renderItem={renderItem}
                  keyExtractor={(item: any) => `${item.ID_TICKET}`}
                />
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.userReducer.user,
  };
};

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     addUser: (user: any) => dispatch(addUser(user)),
//   };
// };
export default connect(mapStateToProps, null)(alertsRisk);
