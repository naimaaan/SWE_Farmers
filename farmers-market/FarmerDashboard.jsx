import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { fetchProducts, deleteProduct } from './api';

const FarmerDashboard = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data);
      setLowStock(response.data.filter((p) => p.quantity < 10));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      Alert.alert('Success', 'Product deleted successfully.');
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-bold mb-4">Farmer Dashboard</Text>
      {lowStock.length > 0 && (
        <Text className="text-red-500 mb-4">
          ⚠️ Low Stock Products: {lowStock.map((p) => p.name).join(', ')}
        </Text>
      )}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 bg-gray-200 rounded">
            <Text className="font-bold">{item.name}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('ProductForm', { product: item })} />
            <Button title="Delete" onPress={() => handleDelete(item.id)} color="red" />
          </View>
        )}
      />
      <Button title="Add Product" onPress={() => navigation.navigate('ProductForm')} />
    </View>
  );
};

export default FarmerDashboard;
