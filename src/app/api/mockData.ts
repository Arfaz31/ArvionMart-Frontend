// src/pages/cart/mockData.ts

import { CartItem, ShippingOption } from "@/types/types";


export const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Performance Running Shoes',
    color: 'Black / Red',
    size: 'US 10',
    price: 129.99,
    quantity: 1,
    image: '/images/shoes-1.jpg',
    brand: 'Nike'
  },
  {
    id: 2,
    name: 'Lightweight Training Shoes',
    color: 'Gray / Blue',
    size: 'US 9.5',
    price: 89.99,
    quantity: 2,
    image: '/images/shoes-2.jpg',
    brand: 'Adidas'
  },
  {
    id: 3,
    name: 'Premium Comfort Insoles',
    color: 'Green',
    size: 'One Size',
    price: 24.99,
    quantity: 1,
    image: '/images/insoles.jpg',
    brand: 'Dr. Scholl\'s'
  }
];

export const shippingOptions: ShippingOption[] = [
  { id: 'standard', label: 'Standard Shipping (3-5 business days)', price: 5.99, delivery: 'May 24 - May 28' },
  { id: 'express', label: 'Express Shipping (2 business days)', price: 12.99, delivery: 'May 22 - May 23' },
  { id: 'nextDay', label: 'Next Day Delivery', price: 19.99, delivery: 'May 21' },
];