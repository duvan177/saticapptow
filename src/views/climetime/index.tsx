import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { Button, Card, Icon } from 'react-native-elements'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function (props: any) {

    const [state, setstate] = useState({
        temp: '',
        temp_min: '',
        temp_max: '',
        humidity: '',
        city: ''
    })

    const getApiClime = async () => {

        const response: any = await axios.get('https://api.openweathermap.org/data/2.5/weather?id=3687925&appid=b65f5f02bf91df431832b0e05d709690&units=metric')
        response.status === 200 && setstate({ ...response.data.main, city: response.data.name })
        console.log(state, response)
    }
    useEffect(() => {
        getApiClime()
    }, [])
    const { navigation } = props;
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View
                style={{
                    height: hp('8%'),
                    backgroundColor: 'white',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: wp('3%'),
                    marginTop: hp('3%')
                }}>
                <Icon
                    name="chevron-left"
                    type="material-community"
                    color={'#000000'}
                    onPress={() => navigation.goBack()}
                />

                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#888888',
                    }}>
                    Estado del clima
                </Text>
                <Icon
                    name="cloud"
                    type="material-community"
                    color={'#000000'}
                />
            </View>

            <View style={{ backgroundColor: "#25375b", borderRadius: 20, height: hp('22%'), flexDirection: "row", marginHorizontal: 20 }}>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image
                        style={{
                            width: '60%',
                            height: '47%'
                        }}
                        resizeMode="stretch"

                        source={require('../../assets/images/lloviendo.png')}
                    />
                    <Text style={{ fontSize: wp('5%'), color: "white", marginTop: hp('2%') }}>{state.city}</Text>
                    <Text style={{ fontSize: wp('4%'), color: "white", textAlign: "left" }}>Colombia</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: wp('15%'), color: "white" }}>{state.temp}°</Text>

                </View>

            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: hp('4%') }}>
                <Card containerStyle={{ borderColor: "white", borderRadius: 20 }}>
                    <Text style={{ color: 'gray' }}>T/Máxima</Text>
                    <Text style={{ textAlign: "center", fontSize: 24, marginTop: hp('2%') }}>{state.temp_max}°</Text>
                </Card>
                <Card containerStyle={{ borderColor: "white", borderRadius: 20 }}>
                    <Text style={{ color: 'gray' }}>T/Mínima</Text>
                    <Text style={{ textAlign: "center", fontSize: 24, marginTop: hp('2%') }}>{state.temp_min}°</Text>
                </Card>
                <Card containerStyle={{ borderColor: "white", borderRadius: 20 }}>
                    <Text style={{ color: 'gray' }}>Humedad</Text>
                    <Text style={{ textAlign: "center", fontSize: 24, marginTop: hp('2%') }}>{state.humidity}%</Text>
                </Card>

            </View>



        </View>
    )
}
