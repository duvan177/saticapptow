import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AnimatedHeader from './components/headerComponent';
const WIDTH = Dimensions.get('window').width;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {WebView} from 'react-native-webview';
import {Badge, Header, Icon} from 'react-native-elements';
import moment from 'moment';

const HEIGHT = Dimensions.get('window').height;
const HEADER_HEIGHT = HEIGHT - HEIGHT * 0.5;

export default function AlertRiskDetail(props: any) {
  const map: any = useRef(null);
  const offset = useRef(new Animated.Value(0)).current;
  const {detail} = props.route.params;
  const {goBack} = props.navigation;
  const headerHeight = offset.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT, 20],
    extrapolate: 'clamp',
  });
  const RunFirst = `
  try {
    window.onload = function() {
      L.marker([${detail.LATITUD} , ${detail.LONGITUD}], {icon: redIcon})
      .addTo(mymap1)
      .bindPopup(
        '<strong>Punto de riesgo</strong><br/> Latitud: ');
        mymap1.setView([${detail.LATITUD} , ${detail.LONGITUD}] , 11);
        setTimeout(() => {
          mymap1.setView([${detail.LATITUD} , ${detail.LONGITUD}] , 15)
        }, 500);
    }
    if(document.readyState === 'complete') {
      L.marker([${detail.LATITUD} , ${detail.LONGITUD}], {icon: redIcon})
    .addTo(mymap1)
    .bindPopup(
      '<strong>Punto de riesgo</strong><br/> Latitud: ');
      mymap1.setView([${detail.LATITUD} , ${detail.LONGITUD}] , 11);
      setTimeout(() => {
        mymap1.setView([${detail.LATITUD} , ${detail.LONGITUD}] , 15)
      }, 500);
    }
  } catch (err) {
    console.error(err)
  }
  true;
`;
  const jsCode = `
   
      true;
      `;

  useEffect(() => {
    console.log('detalle alerta', detail);
    setTimeout(() => {
      map && map.current.injectJavaScript(RunFirst);
    }, 200);
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          height: hp('8%'),
          backgroundColor: 'white',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: wp('3%'),
        }}>
        <Icon
          name="chevron-left"
          type="material-community"
          color={'#000000'}
          onPress={() => goBack()}
        />

        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#888888',
          }}>
          Detalle
        </Text>
        <Icon name="alert" type="material-community" color={'#000000'} />
      </View>

      <Animated.View
        style={{
          position: 'absolute',
          top: hp('8%'),
          left: 0,
          right: 0,
          // marginBottom:-30,

          zIndex: 10,
          height: headerHeight,
          // backgroundColor: 'white',
          // justifyContent:"center" ,
          // alignItems:"center",
          width: '100%',
        }}>
        <>
          <WebView
            ref={map}
            originWhitelist={['*']}
            injectedJavaScript={jsCode}
            injectedJavaScriptBeforeContentLoaded={`
    window.onerror = function(message, sourcefile, lineno, colno, error) {
      alert("Message: " + message + " - Source: " + sourcefile + " Line: " + lineno + ":" + colno);
      return true;
    };
    true;
  `}
            nativeConfig={{props: {webContentsDebuggingEnabled: true}}}
            javaScriptEnabled={true}
            source={{
              uri: 'file:///android_asset/html_script_Onclick_risk.html',
              baseUrl: 'file:///android_asset/',
            }}
            startInLoadingState={true}
            // renderLoading={LoadingIndicatorView}
            // onMessage={onMessage}
            mixedContentMode={'compatibility'}
            injectedJavaScriptBeforeContentLoadedForMainFrameOnly={false}
            onError={err => console.log('error', err)}
            // injectedJavaScriptBeforeContentLoaded={RunFirst}
            // injectedJavaScript={fp}
            allowsLinkPsreview={true}
          />
          <View
            style={{
              height: hp('8%'),
              backgroundColor: '#ecebeb',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="map-marker"
              type="material-community"
              color={'#000000'}
            />

            <Text style={{fontSize: 15, color: '#6b6b6b'}}>Dirección:</Text>
            <Text style={{fontSize: 15, color: '#6b6b6b'}}>Distancia:</Text>
          </View>
        </>
      </Animated.View>

      <ScrollView
        style={{backgroundColor: 'white'}}
        // contentContainerStyle={{paddingTop:hp('40%')}}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: offset}}}],
          {useNativeDriver: false},
        )}>
        <View
          style={{
            marginTop: hp('52%'),
            backgroundColor: 'white',
            paddingHorizontal: wp('5%'),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 22,
                marginBottom: 20,
                fontWeight: 'bold',
              }}>
              {detail.RIESGO.toUpperCase()}
            </Text>
            <Badge
              badgeStyle={{
                height: 30,
                width: 100,
              }}
              status={
                detail.NIVEL_RIESGO == 2
                  ? 'warning'
                  : detail.NIVEL_RIESGO == 1
                  ? 'success'
                  : 'error'
              }
              containerStyle={{top: -10}}
              value={
                <Text style={{color: 'white'}}>
                  {detail.NIVEL_RIESGO == 1 && 'Nivel Bajo'}
                  {detail.NIVEL_RIESGO == 2 && 'Nivel Medio'}
                  {detail.NIVEL_RIESGO == 3 && 'Nivel Alto'}
                </Text>
              }
            />
          </View>
          <Text style={{marginBottom: 20 , fontSize: 18}}>
            Fecha: {moment(detail.FECHA_CREA).format('MMMM Do YYYY, h:mm a')}
          </Text>
          <Text style={{marginBottom: 20, fontSize: 18}}>
            Descripción: {detail.DESCRIPCION_TICKET}
          </Text>
          <View
            style={{
              marginTop: hp('5%'),
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{width: wp('20%'), height: hp('9%')}}
              resizeMode="stretch"
              //   width={ }

              source={{
                uri: `https://0f3922952e3d.ngrok.io/img/iconsrisk/${detail.RIESGO}On.png`,
              }}
            />
            <TouchableOpacity
              style={[
                styles.btnGo,
                {
                  backgroundColor: '#25375b',
                  marginVertical: 10,
                  borderColor: '#25375b',
                },
              ]}
              onPress={() => goBack()}>
              <Text style={{textAlign: 'center', color: '#ffffff'}}>
                Ver medidas de seguridad
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
