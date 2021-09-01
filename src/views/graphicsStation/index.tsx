import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {DATA} from './data';
import moment from 'moment';
const WIDTH = Dimensions.get('window').width;
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
            fontSize: 15,
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
          <Text>{dataMax}</Text>
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
            onDataPointClick={(e) => {
              ToastAndroid.show(`Dato sensor: ${e.value}`, 100);
            }}
            data={{
              labels: reduceData(data?.labels) || ['cargando'],
              datasets: [
                {
                  data: reduceData(data?.datasets) || [0],
                },
              ],
            }}
            verticalLabelRotation={0}
            width={Dimensions.get('window').width * 3} // from react-native
            height={300}
            yAxisLabel=""
            yAxisSuffix=""
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
              verticalLabelRotation={0}
              width={Dimensions.get('window').width * 3} // from react-native
              height={300}
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
  const {navigation} = props;
  const [dataGraphics, setDataGraphics]: any = useState([]);
  const transformData = () => {
    const dataIndex = Object.keys(DATA[0]);

    const data: any = dataIndex.map((item: any) => {
      const labels = DATA[0][item].map((obj: any) =>
        moment(obj.fecha_registro_dato_sensor).format('LT'),
      );
      const datasets = DATA[0][item].map((obj: any) =>
        item == 'P' ? obj.acumulado : obj.dato_sensor,
      );

      const endDataInfo = DATA[0][item][DATA[0][item].length - 1];

      
      
      const datoSensor =
      item == 'P' ? parseInt(endDataInfo.acumulado) : endDataInfo.dato_sensor;
      const percentage = (100 *  datoSensor) / endDataInfo.roja;
   
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
        percentage:percentage
      };
    });
    // const reduceData = data.slice(data.length - 20 , data.length )
    setDataGraphics(data);
    console.log(data);
    // console.log(reduceData);
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
          Gráficos
        </Text>
        <Icon
          name="chart-areaspline"
          type="material-community"
          color={'#000000'}
        />
      </View>
      <ScrollView
        style={
          {
            //   marginBottom:200
          }
        }>
        <MapDataGraphics data={dataGraphics} />
      </ScrollView>
    </View>
  );
}
