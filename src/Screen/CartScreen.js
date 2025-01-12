import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../components/ProductItem';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const cartProducts = Object.keys(cart).map((id) => ({
    id,
    name: `Product ${id}`,
    count: cart[id],
  }));

  return (
    <View style={styles.container}>
      <FlatList
        data={cartProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem product={{ ...item, count: cart[item.id] }} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default CartScreen;

