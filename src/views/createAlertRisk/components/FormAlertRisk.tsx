import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Input, Overlay} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
// import ImagePicker from 'react-native-image-picker';
import JSONLEVEL from '../../../tools/levelRisk';
var PickerImage =  require('react-native-image-picker');
import {RNCamera} from 'react-native-camera';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const HEIGHT = Dimensions.get('window').height;

const MapTypeRisk = ({arr, typeRisk, setRisk, setLabelTypeRisk}: any) => {
  // console.log('mark', arr[0])
  return arr.map((item: any, index: any) => (
    <View
      key={`${index}`}
      style={{
        marginBottom: 20,
        justifyContent: 'space-around',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        key={`${index}`}
        onPress={() => {
          setRisk(item.value);
          setLabelTypeRisk(item.text);
        }}
        style={[
          styles.buttonRisk,
          {
            borderColor: typeRisk == item.value ? '#0542bb' : 'gray',
            borderWidth: typeRisk == item.value ? 3 : 1,
          },
        ]}>
        <Image
          resizeMode="stretch"
          style={{width: 50, height: 50, margin: 15}}
          source={typeRisk == item.value ? item.on : item.off}
        />
      </TouchableOpacity>
    </View>
  ));
};

const MapTypeRiskLevel = ({
  arr,
  typeRisk,
  setRisk,
  setValueRisk,
  setLabelLevelTypeRisk,
}: any) => {
  // console.log('mark', arr[0])
  return arr.map((item: any, index: any) => (
    <View
      key={`${index}`}
      style={{
        marginBottom: 20,
        justifyContent: 'space-around',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        key={`${index}`}
        onPress={() => {
          setRisk(item.value);
          setValueRisk(item.value);
          setLabelLevelTypeRisk(item.label);
        }}
        style={[
          styles.buttonLevelRisk,
          {
            backgroundColor: typeRisk == item.value ? item.color : '#f7f7f7',
            borderColor: typeRisk == item.value ? '#0542bb' : 'gray',
            borderWidth: typeRisk == item.value ? 3 : 1,
          },
        ]}>
        <Text
          style={{
            color:
              typeRisk == item.value
                ? item.value == 2
                  ? 'black'
                  : 'white'
                : 'gray',
            fontWeight: '500',
            fontSize: 20,
          }}>
          {item.label}
        </Text>
      </TouchableOpacity>
    </View>
  ));
};

// import {launchCamera, launchImageLibrary}  from 'react-native-image-picker'
export default function FormAlertRisk(props: any): JSX.Element {
  const {
    findCoordinates,
    goBack,
    statusGeo,
    setData,
    data: dataForm,
    setDataForm,
  } = props;
  const [ColorStatus, setColorStatus] = useState('green');
  const [filePath, setFilePath] = useState('null');
  const [valueRisk, setValueRisk] = useState(0);
  const [typeRisk, setTyperRisk] = useState(0);
  const cameraRef: any = useRef(null);
  const [visible, setVisible] = useState(false);
  const [typeRiskSelected, setypeRiskSelected] = useState(0);
  const [typeRiskLevelSelected, setTypeRiskLevelSelected] = useState(0);

  const [riskValue, setRiskValue] = useState([
    {
      on: require(`../../../assets/images/risk/INCENDIOOn.png`),
      off: require(`../../../assets/images/risk/INCENDIOOff.png`),
      status: false,
      label: 'incendio',
      text: 'incendio',

      value: 23,
    },
    {
      on: require(`../../../assets/images/risk/INUNDACIONOn.png`),
      off: require(`../../../assets/images/risk/INUNDACIONOff.png`),
      status: false,
      label: 'inundacion',
      text: 'inundación',

      value: 24,
    },
    {
      on: require(`../../../assets/images/risk/DESLIZAMIENTOOn.png`),
      off: require(`../../../assets/images/risk/DESLIZAMIENTOOff.png`),
      status: false,
      label: 'deslizamiento',
      text: 'deslizamiento',

      value: 25,
    },
    {
      on: require(`../../../assets/images/risk/INCENDIOFORESTALOn.png`),
      off: require(`../../../assets/images/risk/INCENDIOFORESTALOff.png`),
      status: false,
      label: 'incendioforestal',
      text: 'incendioforestal',

      value: 27,
    },
    {
      on: require(`../../../assets/images/risk/SISMOOn.png`),
      off: require(`../../../assets/images/risk/SISMOOff.png`),
      status: false,
      label: 'sismo',
      text: 'sismo',

      value: 26,
    },
  ]);
  const [labelTypeRisk, setLabelTypeRisk] = useState<any>('');
  const [labelLevelTypeRisk, setLabelLevelTypeRisk] = useState<any>('');
  const [levelRiskArr, setlevelRiskArr] = useState([
    {
      status: false,
      value: 1,
      label: 'Bajo',
      color: '#2eb912',
    },
    {
      status: false,
      value: 2,
      label: 'Medio',
      color: '#effc39',
    },
    {
      status: false,
      value: 3,
      label: 'Alto',
      color: '#e64d1e',
    },
  ]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const cameraPhoto = async () => {
    // cameraRef
    //   .capture()
    //   .then((data: any) => console.log(data))
    //   .catch((err: any) => console.error(err));
    // console.log(cameraRef);
    const options = {quality: 0.5, base64: true};
    const data = await cameraRef.current.takePictureAsync(options);
    console.log('photo', data);
    setData({...dataForm, foto_riesgo: data.base64});
    setFilePath(data.base64);
    setVisible(!visible);
  };

  const chooseFile = async (type: any): Promise<void> => {
    try {
      if (type == 'library') {
        PickerImage.launchImageLibrary(
          {
            maxWidth: 300,
            maxHeight: 550,
            quality: 0,
            
            mediaType: 'photo',
            includeBase64:true
          },
          (response: any) => {
            console.log(response)
            if (!response?.didCancel) {
              //  console.log('photo' ,response)
              setFilePath(response.assets[0].base64);
              setData({...dataForm, foto_riesgo: response.assets[0].base64});
              // console.log(response);
            }
          },
        );
      }
      if (type == 'camera') {
        PickerImage.launchCamera({}, (response: any) => {
          console.log(response);
          if (!response?.idCancel) {
            // console.log('photo' ,response)
            setFilePath(response.data);
            setData({...dataForm, foto_riesgo: response?.data});
            // console.log(response);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }

    // launchImageLibrary(
    //   {
    //     mediaType: 'photo',
    //     includeBase64: false,
    //     maxHeight: 200,
    //     maxWidth: 200,
    //   },
    //   (response: any) => {
    //    console.log(response)
    //   },
    // ):
  };

  const setLevelRisk = (level: any) =>
    setData({...dataForm, nivel_riesgo: level});

  const setDescription = (text: string) =>
    setData({...dataForm, descripcion: text});

  useEffect(() => {
    typeRiskSelected !== 0 &&
      setData({...dataForm, tp_riesgo: typeRiskSelected});
    console.log('type risk', labelTypeRisk);
  }, [typeRiskSelected]);

  return (
    <>
      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: 'white',
          borderTopLeftRadius: 50,

          borderTopRightRadius: 50,
        }}>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              height: 7,
              width: '30%',
              backgroundColor: 'gray',
              marginTop: hp('78%'),
              borderRadius: 20,
            }}
          />
        </View>

        <Text style={{fontSize: 18, textAlign: 'center', marginTop: hp('3%')}}>
          Seleccionar mi ubicación
        </Text>

        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            disabled={statusGeo}
            onPress={(e) => findCoordinates()}
            style={[
              styles.buttonRisk,
              {width: 100, height: 100, marginVertical: 20},
            ]}>
            <Image
              // style={styles.tinyLogo}
              resizeMode="stretch"
              style={{width: 40, height: 40}}
              source={require('../../../assets/images/gpsalerta.png')}
            />
            {/* <Text>Mi ubicación</Text> */}
            {statusGeo ? (
              <ActivityIndicator color={'#25375b'} size={20} />
            ) : (
              <></>
            )}
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 18, marginBottom: 10, textAlign: 'center'}}>
          Tipo de riesgo
        </Text>

        <View
          style={{
            marginBottom: 20,
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <MapTypeRisk
            arr={riskValue.slice(0, 3)}
            typeRisk={typeRiskSelected}
            setLabelTypeRisk={setLabelTypeRisk}
            setRisk={setypeRiskSelected}
          />
        </View>
        <View
          style={{
            marginBottom: 20,
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <MapTypeRisk
            arr={riskValue.slice(3)}
            typeRisk={typeRiskSelected}
            setLabelTypeRisk={setLabelTypeRisk}
            setRisk={setypeRiskSelected}
          />
        </View>
        <View style={{minHeight: 140}}>
          <Text style={{fontSize: 18, textAlign: 'center', marginBottom: 10}}>
            Nivel de riesgo{' '}
            {labelTypeRisk != 'incendioforestal'
              ? labelTypeRisk
              : 'incendio forestal'}
          </Text>

          <>
            {!JSONLEVEL[labelTypeRisk]?.[labelLevelTypeRisk] ? (
              <View style={{marginTop: 35}}>
                <Text style={{textAlign: 'center'}}>
                  Seleciona un nivel de riesgo
                </Text>
              </View>
            ) : (
              <Text style={{textAlign:'justify'}}>{JSONLEVEL[labelTypeRisk]?.[labelLevelTypeRisk]}</Text>
            )}
          </>
        </View>
        <View
          style={{
            marginBottom: 20,
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <MapTypeRiskLevel
            arr={levelRiskArr}
            setLabelLevelTypeRisk={setLabelLevelTypeRisk}
            typeRisk={typeRiskLevelSelected}
            setRisk={setTypeRiskLevelSelected}
            setValueRisk={setLevelRisk}
          />
        </View>

        <Input
          multiline={true}
          placeholder="descripción"
          //  leftIcon={{ type: 'font-awesome', name: 'comment' }}
          style={{minHeight: 100}}
          onChangeText={(value: any) => setDescription(value)}
        />

        <Overlay
          isVisible={visible}
          fullScreen={true}
          onBackdropPress={toggleOverlay}>
          <View style={{flex: 1}}>
            <RNCamera
              ref={cameraRef}
              type={'back'}
              onTouchEndCapture={(e) => console.log(e)}
              style={{flex: 1, minHeight: 400}}
              autoFocus={'on'}
              zoom={0}
              whiteBalance={'auto'}
              flashMode={RNCamera.Constants.FlashMode.auto}
              // permissionDialogTitle={'Permission to use camera'}
              // permissionDialogMessage={
              //   'We need your permission to use your camera phone'
              // }
              // androidCameraPermissionOptions={{
              //   title: 'Permission to use camera',
              //   message: 'We need your permission to use your camera',
              //   buttonPositive: 'Ok',
              //   buttonNegative: 'Cancel',
              // }}
              // androidRecordAudioPermissionOptions={{
              //   title: 'Permission to use audio recording',
              //   message: 'We need your permission to use your audio',
              //   buttonPositive: 'Ok',
              //   buttonNegative: 'Cancel',
              // }}
            />
            <TouchableOpacity
              onPress={(e) => cameraPhoto()}
              style={[styles.TouchableOpacityButton, {marginTop: 10}]}>
              <Text
                style={{
                 
                  fontSize: 14,
                  color: 'white',
                  textAlign: 'center',
                }}>
                Tomar foto
              </Text>
            </TouchableOpacity>
          </View>
        </Overlay>
        <View
          style={{
            justifyContent: 'space-around',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            // onPress={(e) => chooseFile('camera')}
            onPress={(e) => toggleOverlay()}
            style={[styles.TouchableOpacityButtonCamera]}>
            <Image
              resizeMode="stretch"
              style={{width: 40, height: 40}}
              source={require('../../../assets/images/camara.png')}
            />
            <Text>Tomar foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(e) => chooseFile('library')}
            style={[styles.TouchableOpacityButtonCamera]}>
            <Image
              //style={styles.tinyLogo}
              resizeMode="stretch"
              style={{width: 40, height: 40}}
              source={require('../../../assets/images/galeria.png')}
            />
            <Text>Galeria</Text>
          </TouchableOpacity>
        </View>

        <View>
          {filePath != 'null' ? (
            <Image
              // style={styl}
              style={{width: 150, minHeight: 150}}
              source={{uri: `data:image/gif;base64,${filePath}`}}
            />
          ) : (
            <></>
          )}
        </View>

        <View
          style={{
            justifyContent: 'space-around',
            alignContent: 'space-between',
            flexDirection: 'row',
            marginVertical: 30,
          }}>
          <TouchableOpacity
            onPress={(e) => goBack()}
            style={[styles.ButtonCancel]}>
            <Text
              style={{
                
                fontSize: 14,
                color: 'white',
                textAlign: 'center',
              }}>
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(e) => setDataForm()}
            style={[styles.ButtonSave]}>
            <Text
              style={{
               
                fontSize: 14,
                color: 'white',
                textAlign: 'center',
              }}>
              Enviar alerta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  TouchableOpacityButton: {
    backgroundColor: '#25375b',
    borderRadius: 10,
    color: 'white',
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 25,
  },
  TouchableOpacityButtonCamera: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 10,
    // backgroundColor:"red",
    minHeight: 100,
  },
  ButtonSave: {
    backgroundColor: '#25375b',
    borderRadius: 10,
    color: 'white',
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 25,
  },
  ButtonCancel: {
    backgroundColor: '#ee3d56',
    borderRadius: 10,
    color: 'white',
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 25,
  },
  buttonRisk: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    minHeight: 100,
    minWidth: 100,
  },
  buttonLevelRisk: {
    backgroundColor: '#c7c9cc',
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    minHeight: 100,
    minWidth: 100,
  },
});
