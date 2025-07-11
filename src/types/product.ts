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

export interface IVariant {
  _id: string;
  sellingPrice: number;
  discount?: number;
  image?: string[];
  features?: string[];
}

export interface IProduct {
  _id: string;
  productName: string;
  description: string;
  brand?: {
    _id: string;
    brandName: string;
    brandLogo?: string;
  };
  category?: {
    _id: string;
    categoryName: string;
  };
  stock: number;
  isActive: boolean;
  isNewArrival?: boolean;
  variant?: IVariant[];
  createdAt?: string;
}
