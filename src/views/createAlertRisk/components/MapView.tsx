import React, {useEffect, useRef} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
export default function MapView(props: any): JSX.Element {
  const map: any = useRef(null);
  const {setCoordenadas, coordenadas, setData, data: dataForm  } = props;
  var fp: String = `
setTimeout(function(){
  var data = {latlng:{lat: 3.4239978261117328, lng: -76.51599884033205}};
  pointClick(data);
 }, 4000);
    `;

  // window.ReactNativeWebView.postMessage("viaje a cali");

  const validatePosition = () => Object.keys(coordenadas).length > 0 && injectPosition(coordenadas);
  const injectPosition = (coordenates: any): void => {
    const {lat, lng} = coordenates;
    var setPosition: String = `
  var data = {latlng:{lat: ${lat}, lng: ${lng}}};
  pointClick(data);
    `;
    console.log('INJETE LA POSIOCION' , setPosition)
    map.current.injectJavaScript(setPosition);
  };
  const onMessage = (event: any): void => {
    const {data} = event.nativeEvent;
    setCoordenadas(data);
    setData({...dataForm , coordenadas: data})
    console.log('clik mapa' , data);
  };
  const LoadingIndicatorView = () => {
    return <ActivityIndicator color="#009b88" size="large" />;
  };

  useEffect(() => {
    validatePosition();
  }, [coordenadas]);

  return (
    <WebView
      ref={map}
      originWhitelist={['*']}
      nativeConfig={{props: {webContentsDebuggingEnabled: true}}}
      javaScriptEnabled={true}
      source={{
          
        uri: 'file:///android_asset/html_script_Onclick.html',
        baseUrl: 'file:///android_asset/',
      }}
      startInLoadingState={true}
      renderLoading={LoadingIndicatorView}
      onMessage={onMessage}
      mixedContentMode={'compatibility'}
      onError={(err) => console.log('error', err)}
      // injectedJavaScriptBeforeContentLoaded={RunFirst}
      // injectedJavaScript={fp}
    />
    // https://leafletjs.com/examples/quick-start/example.html
  );
}
