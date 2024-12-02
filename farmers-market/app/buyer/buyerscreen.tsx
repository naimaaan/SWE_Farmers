// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, StyleSheet, TextInput, Button, Modal, TouchableOpacity, Image } from 'react-native';
// import { fetchProducts } from '../api/api';
// import ProductCard from '../components/productcard';
// import { Product } from '../types/product';

// const BuyerScreen = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [location, setLocation] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [sortOption, setSortOption] = useState<string>('priceAsc');
//   const [showDetails, setShowDetails] = useState<boolean>(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//   useEffect(() => {
//     const loadProducts = async () => {
//       const data = await fetchProducts(location);  // Pass location filter to the API
//       if (Array.isArray(data)) {
//         setProducts(data);
//         setFilteredProducts(data);
  
//         const uniqueCategories = [
//           ...new Set(data.map((product: Product) => product.category)),
//         ];
  
//         setCategories(uniqueCategories);
//       }
//     };
  
//     loadProducts();
//   }, [location]);  // Reload products whenever location filter changes

//   useEffect(() => {
//     let filtered = products.filter(product =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.category.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Apply sorting
//     if (sortOption === 'priceAsc') {
//       filtered = filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
//     } else if (sortOption === 'priceDesc') {
//       filtered = filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
//     }

//     setFilteredProducts(filtered);
//   }, [searchTerm, sortOption, products]);

//   const handleProductClick = (product: Product) => {
//     setSelectedProduct(product);
//     setShowDetails(true);
//   };

//   const closeDetailsModal = () => {
//     setShowDetails(false);
//     setSelectedProduct(null);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Available Products</Text>
      
//       {/* Search Bar */}
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search products..."
//         value={searchTerm}
//         onChangeText={setSearchTerm}
//       />
      
//       {/* Location Filter */}
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Filter by location..."
//         value={location}
//         onChangeText={setLocation}
//       />

//       {/* Sorting Options */}
//       <View style={styles.sortingContainer}>
//         <Button title="Price: Low to High" onPress={() => setSortOption('priceAsc')} />
//         <Button title="Price: High to Low" onPress={() => setSortOption('priceDesc')} />
//       </View>

//       {/* Display filtered products by category */}
//       {categories.map((category) => (
//         <View key={category} style={styles.categorySection}>
//           <Text style={styles.categoryTitle}>{category}</Text>
//           {filteredProducts
//             .filter((product) => product.category === category)
//             .map((product) => (
//               <TouchableOpacity key={product.id} onPress={() => handleProductClick(product)}>
//                 <ProductCard key={product.id} product={product} />
//               </TouchableOpacity>
//             ))}
//         </View>
//       ))}

// // In your BuyerScreen.tsx file, modify the modal to display the farmer's location correctly
// {showDetails && selectedProduct && (
//   <Modal
//     transparent={true}
//     animationType="slide"
//     visible={showDetails}
//     onRequestClose={closeDetailsModal}
//   >
//     <View style={styles.modalBackground}>
//       <View style={styles.modalContainer}>
//         <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
//         <Text>{selectedProduct.description}</Text>
//         <Text>Price: ${selectedProduct.price}</Text>
//         <Text>Quantity: {selectedProduct.quantity}</Text>
        
//         {/* Correctly access the farmer's location */}
//         <Text>Farm Location: {selectedProduct?.farmer?.location || 'Not available'}</Text>
        
//         <ScrollView horizontal>
//           {selectedProduct.images.map((image) => (
//             <Image key={image.id} source={{ uri: image.image_url }} style={styles.productImage} />
//           ))}
//         </ScrollView>
        
//         <Button title="Close" onPress={closeDetailsModal} />
//       </View>
//     </View>
//   </Modal>
// )}

//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f7f7',
//     padding: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingLeft: 8,
//     borderRadius: 5,
//   },
//   sortingContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 15,
//   },
//   categorySection: {
//     marginBottom: 20,
//   },
//   categoryTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: '80%',
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     margin: 5,
//   },
// });

// export default BuyerScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Button, Modal, TouchableOpacity, Image } from 'react-native';
import { fetchProducts } from '../api/api';
import ProductCard from '../components/productcard';
import { Product } from '../types/product';

const BuyerScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>('priceAsc');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts(location);  // Pass location filter to the API
      if (Array.isArray(data)) {
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = [
          ...new Set(data.map((product: Product) => product.category)),
        ];

        setCategories(uniqueCategories);
      }
    };

    loadProducts();
  }, [location]);  // Reload products whenever location filter changes

  useEffect(() => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply sorting
    if (sortOption === 'priceAsc') {
      filtered = filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOption === 'priceDesc') {
      filtered = filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortOption === 'newest') {
      filtered = filtered.sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime()); // Newest first
    } else if (sortOption === 'popularity') {
      filtered = filtered.sort((a, b) => b.sales_count - a.sales_count); // Most popular first
    }

    setFilteredProducts(filtered);
  }, [searchTerm, sortOption, products]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const closeDetailsModal = () => {
    setShowDetails(false);
    setSelectedProduct(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Available Products</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Location Filter */}
      <TextInput
        style={styles.searchInput}
        placeholder="Filter by location..."
        value={location}
        onChangeText={setLocation}
      />

      {/* Sorting Options */}
      <View style={styles.sortingContainer}>
        <Button title="Price: Low to High" onPress={() => setSortOption('priceAsc')} />
        <Button title="Price: High to Low" onPress={() => setSortOption('priceDesc')} />
        <Button title="Newest" onPress={() => setSortOption('newest')} />
        <Button title="Popularity" onPress={() => setSortOption('popularity')} />
      </View>

      {/* Display filtered products by category */}
      {categories.map((category) => (
        <View key={category} style={styles.categorySection}>
          <Text style={styles.categoryTitle}>{category}</Text>
          {filteredProducts
            .filter((product) => product.category === category)
            .map((product) => (
              <TouchableOpacity key={product.id} onPress={() => handleProductClick(product)}>
                <ProductCard key={product.id} product={product} />
              </TouchableOpacity>
            ))}
        </View>
      ))}

      {/* In your BuyerScreen.tsx file, modify the modal to display the farmer's location correctly */}
      {showDetails && selectedProduct && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showDetails}
          onRequestClose={closeDetailsModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
              <Text>{selectedProduct.description}</Text>
              <Text>Price: ${selectedProduct.price}</Text>
              <Text>Quantity: {selectedProduct.quantity}</Text>

              {/* Correctly access the farmer's location */}
              <Text>Farm Location: {selectedProduct?.farmer?.location || 'Not available'}</Text>

              <ScrollView horizontal>
                {selectedProduct.images.map((image) => (
                  <Image key={image.id} source={{ uri: image.image_url }} style={styles.productImage} />
                ))}
              </ScrollView>

              <Button title="Close" onPress={closeDetailsModal} />
            </View>
          </View>
        </Modal>
      )}
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  sortingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',  // Use space-between to distribute buttons evenly
    flexWrap: 'wrap',  // Allows wrapping if space is not enough
    marginBottom: 15,
    marginTop: 50, 
  },
  categorySection: {
    marginBottom: 20, 
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default BuyerScreen;
