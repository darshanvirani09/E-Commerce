import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cartSlice';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart); // Access cart from Redux

  // Get the count for this product from Redux store
  const count = cart[product.id] || 0;

  const handleIncrease = () => {
    dispatch(addToCart(product.id));
  };

  const handleDecrease = () => {
    if (count > 0) {
      dispatch(removeFromCart(product.id));
    }
  };

  // Check if price is valid
  const formattedPrice = product.price && !isNaN(product.price) ? product.price.toFixed(2) : "N/A";

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.details}>
        <Text style={styles.name}>{product.title}</Text> 
        {/* Use title instead of name */}
        <Text style={styles.type}>{product.category}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${formattedPrice}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={handleDecrease}
          style={[styles.button, count === 0 && styles.disabledButton]}
          disabled={count === 0}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{count}</Text> 
        {/* Display the count from Redux */}
        <TouchableOpacity onPress={handleIncrease} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  details: {
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  type: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'tomato',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProductItem;
