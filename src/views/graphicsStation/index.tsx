import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, ScrollView, ToastAndroid} from 'react-native';
import {DATA} from './data';
import moment from 'moment';
const WIDTH = Dimensions.get('window').width;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
          borderRadius: 20,
        }}>
        {/* <Icon
            name="chevron-left"
            type="material-community"
            color={'#000000'}
            onPress={() => console.log('press')}
          /> */}

        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#888888',
          }}>
          {data.id}
        </Text>
        <Icon name="alert" type="material-community" color={'#000000'} />
      </View>
      <ScrollView
        style={{marginHorizontal: 5}}
        horizontal={true}
        // contentOffset={{x: 10000, y: 0}} // i needed the scrolling to start from the end not the start
        showsHorizontalScrollIndicator={false} // to hide scroll bar
      > 

          {
              data.id !== 'P' ? (
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
                verticalLabelRotation={15}
                width={Dimensions.get('window').width * 3} // from react-native
                height={300}
                yAxisLabel=""
                yAxisSuffix=""
              
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: '#e2cb00',
                  backgroundGradientFrom: '#0b22a3',
                  backgroundGradientTo: '#2672ff',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                    marginHorizontal: 10,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
               decorator={()=><Text>hola</Text>}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
              ) : (
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
                verticalLabelRotation={15}
                width={Dimensions.get('window').width * 3} // from react-native
                height={300}
                yAxisLabel=""
                yAxisSuffix=""
                showValuesOnTopOfBars={true}
                withHorizontalLabels={true}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: '#e2cb00',
                  fillShadowGradientOpacity:0.7,
                  backgroundGradientFrom: '#0b22a3',
                  backgroundGradientTo: '#004cda',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 0) => `rgba(255, 119, 119, ${opacity})`,
                  labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                      padding: 20,
                    borderRadius: 16,
                    marginHorizontal: 10,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                // bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
              )

          }


       
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
        moment(obj.fecha_registro_dato_sensor).format('lll'),
      );
      const datasets = DATA[0][item].map((obj: any) =>
        item == 'P' ? obj.acumulado : obj.dato_sensor,
      );
      return {id: item, labels: labels, datasets: datasets};
    });
    // const reduceData = data.slice(data.length - 20 , data.length )
    setDataGraphics(data);
    console.log(data);
    // console.log(reduceData);
  };

  const MapDataGraphics = ({data}: any) => {
    const Item = data.map((item: any) => (
      <RenderItem key={item.id} data={item} />
    ));
    return <>{Item}</>;
  };

  useEffect(() => {
    transformData();
  }, []);

  return (
    <View style={{flex: 1}}>
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
