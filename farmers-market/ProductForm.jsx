import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { addProduct, updateProduct } from './api';

const ProductForm = ({ route, navigation }) => {
  const product = route.params?.product || {};
  const [name, setName] = useState(product.name || '');
  const [category, setCategory] = useState(product.category || '');
  const [price, setPrice] = useState(product.price || '');
  const [quantity, setQuantity] = useState(product.quantity || '');
  const [description, setDescription] = useState(product.description || '');

  const handleSubmit = async () => {
    const productData = { name, category, price, quantity, description };
    try {
      if (product.id) {
        await updateProduct(product.id, productData);
        Alert.alert('Success', 'Product updated successfully.');
      } else {
        await addProduct(productData);
        Alert.alert('Success', 'Product added successfully.');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-bold mb-4">{product.id ? 'Edit Product' : 'Add Product'}</Text>
      <TextInput
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
        className="border p-2 mb-2"
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        className="border p-2 mb-2"
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        className="border p-2 mb-2"
      />
      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        className="border p-2 mb-2"
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        className="border p-2 mb-4"
      />
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

export default ProductForm;
