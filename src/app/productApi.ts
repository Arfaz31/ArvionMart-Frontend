// src/api/productApi.ts
import {Products } from '@/types/types';

  // Mock data - in a real app, you would fetch from your backend API
  const productsData: Products[] = [
    {
      id: '1',
      name: 'Premium Running Shoes',
      price: 129.99,
      category: 'Running',
      rating: 4.5,
      reviews: 120,
      image: 'https://res.cloudinary.com/dbpexd7oc/image/upload/v1745000354/Untitled_design_2_e7toui.png',
      description: 'High-performance running shoes with advanced cushioning',
      features: [
        'Breathable mesh upper',
        'Responsive cushioning',
        'Durable rubber outsole'
      ],
      reviewsList: [
        {
          id: '1',
          user: 'John D.',
          rating: 5,
          comment: 'Extremely comfortable for long runs',
          date: '2023-05-15'
        }
      ],
      faqs: [
        {
          question: 'Are these good for marathon training?',
          answer: 'Yes, many marathon runners use this model for training'
        }
      ]
    },
    // Add more products as needed
  ];
  
  export async function getProducts(): Promise<Products[]> {
    // In a real app, this would be an API call
    return productsData;
  }
  
  export async function getProduct(id: string): Promise<Products | undefined> {
    // In a real app, this would be an API call
    return productsData.find(product => product.id === id);
  }