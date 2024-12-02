// // app/api/api.js
// export const fetchProducts = async () => {
//     try {
//       const response = await fetch('http://192.168.160.18:8000/products/list');
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       return [];
//     }
//   };
  // app/api/api.js

export const fetchProducts = async (location = '') => {
  try {
    // Build the query parameters string
    let url = 'http://192.168.160.18:8000/products/list/';
    if (location) {
      url += `?location=${encodeURIComponent(location)}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
