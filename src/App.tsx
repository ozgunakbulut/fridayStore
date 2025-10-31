import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import data from './data.json';
import ProductCard from './components/ProductCard/ProductCard';
import StaticSearchBar from './components/SearchBar/StaticSearchBar'; 


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>FridayStore</Text>
      <StaticSearchBar 
        placeholder="Search products..." 
        onPress={() => console.log('Arama çubuğu tıklandı!')} 
      />
      <FlatList
        numColumns={2}
        data={data}
        renderItem={({ item, index }) => (
          <ProductCard
            title={item.title}
            price={item.price}
            inStock={item.inStock}
            imgURL={item.imgURL}
            onPress={() => {
              console.log(`Product ${item.id} pressed`);
            }}
            fullWidth={index === data.length - 1 && data.length % 2 !== 0}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#ffffffff',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
    marginLeft: 25,
  },
});
