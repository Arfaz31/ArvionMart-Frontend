export interface IProduct {
  _id: string;
  productName: string;
  slug: string;
  description: string;
  category: ICategory;
  subcategory: ISubcategory;
  price: number;
  quantity: number;
  stock: number;
  discountPercentage: number;
  tax: number;
  features: IFeature[];
  images: string[];
  isActive: boolean;
  isNewArrival: boolean;
  averageRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  inStock: boolean;
}

export interface ICategory {
  _id: string;
  categoryName: string;
  description: string;
  isActive: boolean;
  category: string;
  slug: string;
  products: IProduct[];
  totalProducts: number;
  imageUrl: string;
  status: string;
  isDeleted: boolean;
  metaTags: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISubcategory {
  status: string;
  isDeleted: boolean;
  _id: string;
  subcategoryName: string;
  category: string;
  description: string;
  slug: string;
  metaTags: string[];
}

export interface IFeature {
  featureName: string;
  _id: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// src/pages/cart/types.ts
export interface CartItem {
  id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  saveInfo: boolean;
  shippingSameAsBilling: boolean;
}

export interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
}

export interface ShippingOption {
  id: string;
  label: string;
  price: number;
  delivery: string;
}
