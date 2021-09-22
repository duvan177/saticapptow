import React, {useEffect, useRef} from 'react';
import {ActivityIndicator, Animated, Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HEIGHT = Dimensions.get('window').height;

const HEADER_HEIGHT = HEIGHT - HEIGHT * 0.25;
const OPACITY = 1;

const AnimatedHeader = ({animatedValue}: any) => {
  const map: any = useRef(null);
  const insets = useSafeAreaInsets();
  const opacity = animatedValue.interpolate({
    inputRange: [0, 200],
    outputRange: [0.9, 0.1],
    extrapolate: 'clamp',
  });
  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT , 20 ],
    extrapolate: 'clamp',
  });
  const LoadingIndicatorView = () => {
    return <ActivityIndicator color="#009b88" size="large" />;
  };

  useEffect(() => {
    console.log(insets, headerHeight);
  }, [animatedValue]);
  return (
    <Animated.View
    style={{
      position: 'absolute',
      // top: hp('6%'),
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
        // onMessage={onMessage}
        mixedContentMode={'compatibility'}
        onError={(err) => console.log('error', err)}
        // injectedJavaScriptBeforeContentLoaded={RunFirst}
        // injectedJavaScript={fp}
      />
</>
      {/* <TouchableOpacity 
      // activeOpacity={0.2}
      style={{
        height:50, 
        // opacity: 0.9,
        width:100,
        // backgroundColor:"red"
      }}>
        <Animated.Text style={{ opacity:  opacity ,  backgroundColor:"red" , height:50  }}>Punto de riesgo</Animated.Text>
        
      </TouchableOpacity> */}
    </Animated.View>
  );
};

export default AnimatedHeader;
