import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Platform,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {DATA} from './data';
import moment from 'moment';
const WIDTH = Dimensions.get('window').width;
import Toast from 'react-native-simple-toast';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ProgressCircle from 'react-native-progress-circle';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {Icon} from 'react-native-elements';
import {historyDataStation} from '../../api/user.routes';
const reduceData = (array: any) => {
  const newData = array.slice(array.length - 20, array.length + 1);
  return newData;
};

const RenderItem = ({data}: any) => {
  const newData = reduceData(data.datasets);
  const dataEnd = newData[newData.length - 1];
  const dataMax = Math.max(...newData);
  console.log('dato max', data.infoSensor.nom_sensor);
  return (
    <>
      <View
        style={{
          height: hp('8%'),
          backgroundColor: '#dddddd',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: wp('3%'),
          marginHorizontal: wp('3%'),
          borderRadius: 20,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#888888',
          }}>
          {data.id}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: '#424242',
          }}>
          {data.infoSensor?.nom_sensor}
        </Text>
        <Icon name="alert" type="material-community" color={'#000000'} />
      </View>
      <View
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 20,
        }}>
        <TouchableOpacity>
          <Icon
            name="arrow-up-drop-circle"
            type="material-community"
            color={'#ff0e0e'}
          />
          <Text style={{textAlign: 'center', marginVertical: 10}}>
            {dataMax}
          </Text>
          <Text style={{color: 'gray', fontWeight: 'bold'}}>
            Dato máximo registrado
          </Text>
        </TouchableOpacity>

        <ProgressCircle
          percent={data.percentage}
          radius={50}
          borderWidth={8}
          color={data.status}
          shadowColor="#dddddd"
          bgColor="#fff">
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#888888',
            }}>
            {dataEnd}
          </Text>
        </ProgressCircle>
      </View>
      <ScrollView
        contentOffset={{x: Dimensions.get('window').width * 3, y: 0}}
        style={{marginHorizontal: 5}}
        horizontal={true}
        // contentOffset={{x: 10000, y: 0}} // i needed the scrolling to start from the end not the start
        showsHorizontalScrollIndicator={false} // to hide scroll bar
      >
        {data.id !== 'P' ? (
          <LineChart
            onDataPointClick={(e: any) => {
              if (Platform.OS === 'android') {
                ToastAndroid.show(`Dato sensor: ${e.value}`, 100);
              } else {
                Toast.show('This is a toast.');
              }
            }}
            data={{
              labels: reduceData(data?.labels) || ['cargando'],
              datasets: [
                {
                  data: reduceData(data?.datasets) || [0],
                },
              ],
            }}
            verticalLabelRotation={20}
            width={Dimensions.get('window').width * 3} // from react-native
            height={hp('40%')}
            yAxisLabel=""
            yAxisSuffix=""
            fromZero={true}
            // renderDotContent={(x)=><Text>12</Text>}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#003cff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#f1f1f1',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(41, 94, 253, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
                marginHorizontal: 10,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffffff',
              },
              
            }}
            //  decorator={()=><Text>hola</Text>}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        ) : (
          <>
            <BarChart
              // onDataPointClick={(e) => {
              //   ToastAndroid.show(`Dato sensor: ${e.value}`, 100);
              // }}
              data={{
                labels: reduceData(data?.labels) || ['cargando'],
                datasets: [
                  {
                    data: reduceData(data?.datasets) || [0],
                  },
                ],
              }}
              verticalLabelRotation={20}
              width={Dimensions.get('window').width * 3} // from react-native
              height={hp('40%')}
              yAxisLabel=""
              yAxisSuffix=""
              showValuesOnTopOfBars={true}
              withHorizontalLabels={true}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#2c2c2c',
                fillShadowGradientOpacity: 0.7,
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 0) => `rgba(41, 94, 253, ${opacity})`,
                labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  padding: 20,
                  borderRadius: 16,
                  marginHorizontal: 10,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#000000',
                },
              }}
              // bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </>
        )}
      </ScrollView>
    </>
  );
};
export default function index(props: any) {
  const {navigation, route} = props;
  const [refreshing, setRefreshing] = React.useState(false);
  const [dataGraphics, setDataGraphics]: any = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const onRefresh = React.useCallback(async () => {
    setLoadingData(true);
    await transformData();
    setLoadingData(false);
  }, []);
  const transformData = async () => {
    setLoadingData(true);
    const responseData: any = await historyDataStation(
      route.params.data.id_estacion,
    );

    console.log('response data', route.params.data.nom_estacion);
    setLoadingData(false);
    if (!responseData.status) return;

    const dataIndex = Object.keys(responseData?.data[0]);
    const data: any = dataIndex.map((item: any) => {
      const labels = responseData?.data[0][item].map((obj: any) =>
        moment(obj.fecha_registro_dato_sensor).format('h:mm:ss a'),
      );
      const datasets = responseData?.data[0][item].map((obj: any) =>
        item == 'P' ? obj.acumulado : obj.dato_sensor,
      );

      const endDataInfo =
        responseData?.data[0][item][responseData?.data[0][item].length - 1];

      const datoSensor =
        item == 'P' ? parseInt(endDataInfo.acumulado) : endDataInfo.dato_sensor;
      const percentage = (100 * datoSensor) / endDataInfo.roja;

      let status;
      if (
        !(
          endDataInfo.amarila == 0 &&
          endDataInfo.naranja == 0 &&
          endDataInfo.roja == 0
        )
      ) {
        if (datoSensor < endDataInfo.amarila) {
          status = 'green';
        } else if (
          datoSensor >= endDataInfo.amarila &&
          datoSensor < endDataInfo.naranja
        ) {
          status = 'yellow';
        } else if (
          datoSensor >= endDataInfo.naranja &&
          datoSensor < endDataInfo.roja
        ) {
          status = 'orange';
        }
      } else {
        status = 'gray';
      }
      // console.log(endDataInfo);
      return {
        id: item,
        labels: labels,
        datasets: datasets,
        infoSensor: endDataInfo,
        status: status,
        percentage: percentage,
      };
    });

    setDataGraphics(data);
    return true;
  };

  const MapDataGraphics = ({data}: any) => {
    const Item = data.map((item: any) => (
      <>
        <RenderItem key={item.id} data={item} />
      </>
    ));
    return <>{Item}</>;
  };

  useEffect(() => {
    transformData();
    // console.log('data graphics' , route.params.data)
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          height: hp('8%'),
          backgroundColor: 'white',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: wp('3%'),
          marginTop: hp('3%'),
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
          Estación {route.params.data.nom_estacion}
        </Text>
        <Icon
          name="chart-areaspline"
          type="material-community"
          color={'#000000'}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            style={{justifyContent: 'center', marginTop: hp('4%')}}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        {loadingData ? (
          <View style={{justifyContent: 'center', flex: 1, height: hp('100%')}}>
            <ActivityIndicator size="large" color="#25375b" />
          </View>
        ) : (
          <>
            {dataGraphics.length == 0 ? (
              <View
                style={{
                  height: hp('100%'),
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                  }}>
                  No se escontró datos para mostrar
                </Text>
              </View>
            ) : (
              <MapDataGraphics data={dataGraphics} />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
