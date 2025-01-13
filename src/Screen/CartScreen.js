import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../components/ProductItem';
import { setProducts } from '../store/cartSlice'; // Import action to set products

const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart); // Access cart from Redux
  const products = useSelector((state) => state.cart.products); // All products with details

  // Fetch products only once
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      dispatch(setProducts(data)); // Store products in Redux state
    };

    fetchProducts();
  }, [dispatch]);

  // Filter products based on the items in the cart
  const cartProducts = products.filter((product) => cart[product.id]);

  // Calculate subtotal
  const subtotal = cartProducts.reduce((sum, product) => {
    const count = cart[product.id] || 0;
    return sum + count * product.price;
  }, 0);

  return (
    <View style={styles.container}>
      {cartProducts.length > 0 ? (
        <>
          <FlatList
            data={cartProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductItem product={{ ...item, count: cart[item.id] }} />
            )}
          />
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>Subtotal</Text>
            <Text style={styles.subtotalValue}>${subtotal.toFixed(2)}</Text>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  subtotalContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  subtotalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4caf50',
    marginTop: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default CartScreen;
