// src/screens/BuyerScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { fetchProducts } from '../api/api';
import ProductCard from '../components/productcard';
import { Product } from '../types/product';  // Import the Product type
import { images } from "../../constants";

const BuyerScreen = () => {
  // Define state with explicit types
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();

      // Ensure data is typed correctly (Product[])
      if (Array.isArray(data)) {
        setProducts(data);

        // TypeScript will now know that data is an array of Products
        const uniqueCategories = [
          ...new Set(data.map((product: Product) => product.category)),
        ];

        setCategories(uniqueCategories);
      }
    };

    loadProducts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Available Products</Text>

      {categories.map((category) => (
        <View key={category} style={styles.categorySection}>
          <Text style={styles.categoryTitle}>{category}</Text>
          {products
            .filter((product) => product.category === category)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default BuyerScreen;