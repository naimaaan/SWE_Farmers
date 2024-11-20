import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Type definitions
type CartItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  imageUrl: string;
};

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Banana 1kg",
      price: "$2.50",
      quantity: 2,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Apple 1kg",
      price: "$3.00",
      quantity: 1,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      name: "Whole Milk 1L",
      price: "$2.50",
      quantity: 3,
      imageUrl: "https://via.placeholder.com/150",
    },
  ]);

  const calculateTotal = () =>
    cartItems
      .reduce(
        (total, item) =>
          total + parseFloat(item.price.slice(1)) * item.quantity,
        0
      )
      .toFixed(2);

  const clearCart = () => setCartItems([]);

  const increaseQuantity = (id: string) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decreaseQuantity = (id: string) =>
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.cartImage} />
      <View style={styles.cartDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
            <Ionicons name="remove-circle-outline" size={24} color="#FF6E6E" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
            <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with delete icon */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#fff"
          style={styles.headerIcon}
        />
        <Text style={styles.headerTitle}>Your Cart</Text>
        <TouchableOpacity onPress={clearCart} style={styles.clearButton}>
          <Ionicons name="trash-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Background title */}
      <View style={styles.backgroundTextContainer}>
        <Text style={styles.backgroundText}>Your Cart</Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={renderCartItem}
          contentContainerStyle={styles.cartList}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalPrice}>${calculateTotal()}</Text>
        </View>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "#4CAF50",
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  headerIcon: {
    marginRight: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "Roboto",
    fontWeight: "900",
  },
  clearButton: {
    padding: 5,
  },
  backgroundTextContainer: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: -1,
  },
  backgroundText: {
    fontSize: 50,
    color: "#333",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  cartList: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  cartListFlex: {
    flexGrow: 1,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#333",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  cartDetails: {
    flex: 1,
  },
  itemName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    color: "#FF6E6E",
    fontSize: 14,
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 10,
  },
  mainContent: {
    flex: 0.88, // Ensures the FlatList only occupies available space
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#222",
    borderTopWidth: 1,
    borderTopColor: "#444",
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    color: "#4CAF50",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  nextButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
