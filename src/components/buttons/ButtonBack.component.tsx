import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements'
// import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLORS} from '../../constants/color';
//* handleSubmit((data:any) => onSubmit(data))
const {width} = Dimensions.get('window');
export default function ButtonSubmit(props: any) {
  const {action} = props;
  useEffect(() => {
    console.log('props', props);
  }, []);
  return (
    <TouchableOpacity
      disabled={false}
      style={[
        styles.btnGo,
        {
          borderColor:'transparent',
          backgroundColor: 'transparent',
        },
      ]}
      onPress={action}>
      <Icon
        
        name="arrow-left"
        type="material-community"
        color={'#000000'}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnGo: {
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 2,
    height: 40,
    width: width / 4,
    borderRadius: 20,
  },
});
