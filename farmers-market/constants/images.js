import profile from "../assets/images/profile.png";
import thumbnail from "../assets/images/thumbnail.png";
import cards from "../assets/images/cards.png";
import path from "../assets/images/path.png";
import farm from "../assets/images/farm.png";
import farmSmall from "../assets/images/farm-small.png";
import empty from "../assets/images/empty.png";
import vegetables from "../assets/images/vegetables.png";
import farmers from "../assets/images/farmers.png";
import mango from "../assets/images/mango.png"

export default { profile, thumbnail, cards, path, farm, farmSmall, empty , vegetables, farmers , mango};


// //// src/components/ProductCard.tsx
// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import { images } from '../../constants'; // Import the images from the constants folder

// const ProductCard = ({ product }) => {
//   const { name, category, price, description, images: productImages } = product;

//   // Check if the category exists in the imported images object
//   const imageUrl = productImages?.[0]?.image_url;
//   const imageKey = category.toLowerCase();
//   const imageSource = images[imageKey] || null
//   // If we have a matching image key, use the image from the `images` object

//   return (
//     <View style={styles.card}>
//       {/* Display the image if available */}

//         <Image source = {imageSource}
//         style={styles.image}
//         />
//       <Text style={styles.name}>{name}</Text>
//       <Text style={styles.category}>{category}</Text>
//       <Text style={styles.price}>${price}</Text>
//       <Text style={styles.description}>{description}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: 'white',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 5,
//   },
//   category: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   price: {
//     fontSize: 16,
//     color: 'green',
//     marginVertical: 5,
//   },
//   description: {
//     fontSize: 14,
//     color: 'gray',
//   },
// });

// export default ProductCard;
