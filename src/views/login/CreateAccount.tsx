import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {userRoutes} from '../../api';
import {ButtonSubmitComponent} from '../../components';
import {COLORS} from '../../constants/color';
export default function CreateAccount(props: any) {
  console.log(props);
  const {navigation} = props;
  const {register, handleSubmit, control, watch, errors} = useForm();
  const [typeRisk, setTypeRisk] = useState('');
  const [status, setstatus] = useState(true);
  const onSubmit = (data: any) => registerUser(data);
  const registerUser = async (data: any) => {
    console.log('entré');
    setstatus(false);
    const response: any = await userRoutes.registerSensorHuman(data);
    console.log('generando registro', response);
    if (response.status) {
      setstatus(true);
      Alert.alert('registrado con exito');
      navigation.goBack();
      console.log(response);
    }
    if (!response.status) {
      setstatus(true);
      Alert.alert(
        'Error al registrar, intenta nuevamente o espera unos minutos. Gracias',
      );
    }
    // else {
    // }
    // setstatus(true);
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <>
        {status ? (
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View
              style={{
                height: '10%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 20}}>Registro</Text>
            </View>
            <View style={{paddingHorizontal: 30, flex: 3}}>
              <Controller
                name="nombre"
                defaultValue=""
                control={control}
                render={({onChange, value}) => (
                  <Input
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder="Nombre"
                    defaultValue=""
                  />
                )}
                rules={{
                  required: {value: true, message: 'requerido este valor'},
                }}
              />
              <>
                {errors.nombre ? (
                  <Text
                    style={{
                      color: 'red',
                      marginHorizontal: 20,
                      marginTop: -20,
                    }}>
                    requerido este valor.
                  </Text>
                ) : (
                  <></>
                )}
              </>

              <Controller
                defaultValue=""
                name="apellido"
                control={control}
                render={({onChange, value}) => (
                  <Input
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder="Apellido"
                  />
                )}
                rules={{required: true}}
              />
              <>
                {errors.apellido ? (
                  <Text
                    style={{
                      color: 'red',
                      marginHorizontal: 20,
                      marginTop: -20,
                    }}>
                    requerido este valor.
                  </Text>
                ) : (
                  <></>
                )}
              </>
              <Controller
                defaultValue=""
                name="email"
                control={control}
                render={({onChange, value}) => (
                  <Input
                    keyboardType={'email-address'}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder="Email"
                  />
                )}
                rules={{
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                }}
              />
              <>
                {errors.email?.type == 'required' ? (
                  <Text
                    style={{
                      color: 'red',
                      marginHorizontal: 20,
                      marginTop: -20,
                    }}>
                    requerido este valor.
                  </Text>
                ) : (
                  <></>
                )}
                {errors.email?.type == 'pattern' ? (
                  <Text
                    style={{
                      color: 'red',
                      marginHorizontal: 20,
                      marginTop: -20,
                    }}>
                    correo no válido.
                  </Text>
                ) : (
                  <></>
                )}
              </>

              <Controller
                defaultValue=""
                name="celular"
                control={control}
                render={({onChange, value}) => (
                  <Input
                    keyboardType={'phone-pad'}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder="celular"
                  />
                )}
                rules={{required: true, maxLength: 10}}
              />
              {errors.celular?.type == 'required' && (
                <Text
                  style={{color: 'red', marginHorizontal: 20, marginTop: -20}}>
                  requerido este valor.
                </Text>
              )}
              {errors.celular?.type == 'maxLength' && (
                <Text
                  style={{color: 'red', marginHorizontal: 20, marginTop: -20}}>
                  Número no válido, máximo 10 carácteres.
                </Text>
              )}

              <Controller
                defaultValue=""
                name="tipoDocumento"
                control={control}
                render={({onChange, value}) => (
                  <Picker
                    selectedValue={value}
                    style={{
                      height: 50,
                      width: 'auto',
                      borderBottomColor: 'black',
                      borderWidth: 5,
                      marginHorizontal: 10,
                    }}
                    onValueChange={(itemValue: any, itemIndex) => {
                      console.log(itemValue);
                      onChange(itemValue);
                    }}>
                    <Picker.Item label="Tipo de documento" value="" />
                    <Picker.Item label="Cedula" value="8" />
                    <Picker.Item label="Pasaporte" value="7" />
                    <Picker.Item label="otro" value="6" />
                  </Picker>
                )}
                rules={{
                  required: {value: true, message: 'requerido este valor'},
                }}
              />
              <View style={{paddingHorizontal: 20}}>
                <>
                  {errors.tipoDocumento ? (
                    <Text style={{color: 'red'}}>requerido este valor.</Text>
                  ) : (
                    <></>
                  )}
                </>
              </View>
              <Controller
                defaultValue=""
                name="documento"
                control={control}
                render={({onChange, value}) => (
                  <Input
                    keyboardType={'numeric'}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder="Documento"
                  />
                )}
                rules={{required: true, valueAsNumber: true}}
              />
              <>
                {errors.documento ? (
                  <Text
                    style={{
                      color: 'red',
                      marginHorizontal: 20,
                      marginTop: -20,
                    }}>
                    requerido este valor.
                  </Text>
                ) : (
                  <></>
                )}
              </>
              <Controller
                defaultValue=""
                name="contrasena"
                control={control}
                render={({onChange, value}) => (
                  <Input
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                  />
                )}
                rules={{required: true, minLength: 6}}
              />
              <>
                {errors.contrasena?.type === 'required' ? (
                  <Text
                    style={{
                      color: 'red',
                      marginHorizontal: 20,
                      marginTop: -20,
                    }}>
                    requerido este valor.
                  </Text>
                ) : (
                  <></>
                )}
              </>

              {errors.contrasena?.type === 'minLength' ? (
                <Text
                  style={{color: 'red', marginHorizontal: 20, marginTop: -20}}>
                  Minimo 6 caracteres requeridos
                </Text>
              ) : (
                <></>
              )}

              <Controller
                defaultValue=""
                name="confirmaContrasena"
                control={control}
                render={({onChange, value}) => (
                  <Input
                    secureTextEntry={true}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder="Confirma Contraseña"
                  />
                )}
                rules={{
                  required: true,
                  minLength: 6,
                  validate: (value) => value == watch('contrasena'),
                }}
              />
              {errors.confirmaContrasena?.type === 'required' ? (
                <Text
                  style={{color: 'red', marginHorizontal: 20, marginTop: -20}}>
                  requerido este valor.
                </Text>
              ) : (
                <></>
              )}
              {errors.confirmaContrasena?.type === 'minLength' ? (
                <Text
                  style={{color: 'red', marginHorizontal: 20, marginTop: -20}}>
                  Minimo 6 caracteres requeridos
                </Text>
              ) : (
                <></>
              )}
              {errors.confirmaContrasena?.type === 'validate' ? (
                <Text
                  style={{color: 'red', marginHorizontal: 20, marginTop: -20}}>
                  Contraseña debe ser la misma
                </Text>
              ) : (
                <></>
              )}
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
                <ButtonSubmitComponent
                  textContent={'Registrarme'}
                  colorContent={COLORS.BLUE}
                  colorText={COLORS.WITHE}
                  action={handleSubmit((data) => onSubmit(data))}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
                <ButtonSubmitComponent
                  textContent={'Cancelar'}
                  colorContent={COLORS.RED}
                  colorText={COLORS.WITHE}
                  action={() => navigation.goBack()}
                />
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              flex: 1,
            }}>
            <ActivityIndicator color={'#25375b'} size={40} />
          </View>
        )}
      </>
      {/* <ButtonSubmitComponent /> */}
    </ScrollView>
  );
}
