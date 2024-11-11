import React from 'react';
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from 'react-native-chart-kit';

const GraficoPizza = ({ item }) => {
  const widthAndHeight = 200;
  const screenWidth = Dimensions.get("window").width;

  const valorGrafico = Math.max(0, Math.min(item, 100));

  const data = [
    {
      name: 'Diferença',
      population: valorGrafico,
      color: '#B6FFFA',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Restante',
      population: 100 - valorGrafico,
      color: '#687EFF',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        width={screenWidth}
        height={widthAndHeight}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="10"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  percentage: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default GraficoPizza;
