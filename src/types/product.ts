export interface Review {
    id: string;
    author: string;
    rating: number;
    date: string;
    content: string;
  }
  
  export interface FAQ {
    question: string;
    answer: string;
  }
  
  export interface Product {
    id: string;
    name: string;
    description: string;
    fullDescription?: string;
    price: number;
    salePrice?: number;
    images: string[];
    rating: number;
    reviewCount: number;
    inStock: boolean;
    tags?: string[];
    variants?: string[];
    specifications?: Record<string, string>;
    reviews?: Review[];
    faqs?: FAQ[];
  }
  
// types/index.ts
export type ProductType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};