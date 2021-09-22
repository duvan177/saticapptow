import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View, useWindowDimensions} from 'react-native';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import {ActivityIndicator} from 'react-native';
const WIDTH = Dimensions.get('window').width;
import ActionButton from 'react-native-action-button';
import {addUser} from '../../store/actions';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import { heightPercentageToDP } from 'react-native-responsive-screen';
function MapaView(props: any) {
  const {navigation, user} = props;

  const [data, seData] = useState([]);
  const [loading, setLoading] = useState(true);
  const Map: any = useRef(null);

  const getData = async (): Promise<any> => {
    // let response = await axios.get(
    //   'https://pokeapi.co/api/v2/pokemon?limit=151',
    // );
    // seData(response.data.results);
    setLoading(false);
    // console.log('poke api', data);
    console.log(Map);
  };

  const generateRisk = () => {
    if (Object.keys(user).length == 0) {
      navigation.navigate('LoginStackContainer', {
        screen: 'Login',
      });
    } else {
      navigation.navigate('AlertRiskStackContainer', {
        screen: 'CreateAlert',
      });
  
    }
  };

  //   keyExtractor={(item: any) => item.name}
  const LoadingIndicatorView = () => {
    return <ActivityIndicator color="#009b88" size="large" />;
  };

  useEffect(() => {
    Map && Map.current?.reload();
    getData();
    console.log(props);
  }, []);
  const contentWidth = useWindowDimensions().width;
  const [renderedOnce, setRenderedOnce] = useState(false);
  const updateSource = () => {
    setRenderedOnce(true);
  };

  const onMessage = (event: any): void => {
    const {data} = event.nativeEvent;
    const details = JSON.parse(data);
    // console.log('press' , details);
    if(details.typeaction == 'GraphicsStation'){
      navigation.navigate('GraphicStationContainer', {
        screen: 'GraphicsStation',
        params:{data: details.data}
      });
    }else {
      navigation.navigate('AlertRiskStackContainer', {
          screen: 'AlertRiskDetail',
          params: {detail: details.data},
        });
      }

  };



  return (
    <>
      {loading ? (
        <View style={{justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="large" color="#BD1212" />
        </View>
      ) : (
        // <FlatList
        //   numColumns={2}
        //   data={data}
        //   renderItem={renderItem}
        //   keyExtractor={(item: any) => item.name}
        //   contentContainerStyle={{justifyContent: 'space-between' }}
        // />

        <WebView
        
          renderLoading={LoadingIndicatorView}
          ref={Map}
          originWhitelist={['*']}
          source={{
            uri: 'file:///android_asset/html_script_.html',
            baseUrl: 'file:///android_asset/',
          }}
          useWebKit
          onMessage={onMessage}
          // source={{uri: 'https://mapviewsatic.000webhostapp.com/'}}
          // source={{html:Html}}
          
          automaticallyAdjustContentInsets={false}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          onLoad={updateSource}
          scalesPageToFit={true}
          ignoreSslError={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          onError={(err) => console.log('error', err)}
        />
      )}

      <ActionButton
      style={{
        marginBottom:heightPercentageToDP('9%')
       }}

        shadowStyle={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
            
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          
          elevation: 5,
          
        }}
        fixNativeFeedbackRadius={true}
        onPress={() => {
          generateRisk();
        }}
        renderIcon={() => (
          <Icon
            size={40}
            name="alert"
            type="material-community"
            color={'#ffffff'}
          />
        )}
        buttonColor="#ee3d56"></ActionButton>
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(MapaView);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: 'red',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
