import { Product } from "./product";



export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  variant?: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}