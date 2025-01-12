import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';

const Header = () => {
  const totalCount = useSelector((state) => state.cart.totalCount);

  return (
    <View style={styles.header}>
      <Image source={require('../assents/grocery-store.png')} style={styles.logo} />
      <Text style={styles.cartCount}>Cart: {totalCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  logo: {
    width: 30,
    height: 30,
  },
  cartCount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;

