// src/types/Product.ts
export interface Product {
    id: number;
    farmer: string;
    images: {
      id: number;
      image_url: string;
    }[];
    name: string;
    category: string;
    price: string;
    quantity: number;
    description: string;
  }
  