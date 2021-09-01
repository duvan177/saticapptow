import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLORS} from '../../constants/color';
//* handleSubmit((data:any) => onSubmit(data))
const {width} = Dimensions.get('window');
export default function ButtonSubmit(props: any) {
  const {action, colorContent, colorText, textContent} = props;
  useEffect(() => {
    console.log('props', props);
  }, []);
  return (
    <TouchableOpacity
      disabled={false}
      style={[
        styles.btnGo,
        {
          borderColor: colorContent || COLORS.BLUE,
          backgroundColor: colorContent || COLORS.BLUE,
        },
      ]}
      onPress={action}>
      <Text style={{textAlign: 'center', color: colorText || COLORS.WITHE}}>
        {textContent}
      </Text>
      {/* {
              !statusLogin ?  :  <ActivityIndicator color="#ffffff" size="large" />
            } */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnGo: {
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 2,
    height: 40,
    width: width / 1.5,
    borderRadius: 20,
  },
});
