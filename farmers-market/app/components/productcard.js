// src/components/ProductCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = ({ product }) => {
  const { name, category, price, description, images: productImages } = product;

  // Assuming productImages[0].image_url contains the URL for the image
  const imageUrl = productImages?.[0]?.image_url;

  return (
    <View style={styles.card}>
      {/* Check if imageUrl exists and display the image */}
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text>No image available</Text>
      )}

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.price}>${price}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  category: {
    fontSize: 14,
    color: 'gray',
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ProductCard;
