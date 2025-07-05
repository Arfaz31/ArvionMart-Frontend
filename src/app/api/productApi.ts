import { Product } from "@/types/product";
// This is a mock API function. In a real application, this would call a backend API
export async function getProduct(id: string): Promise<Product | null> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock product data
      const product: Product = {
        id,
        name: 'Example Product',
        description: 'This is an example product with a short description.',
        fullDescription: 'This is a more detailed description of the example product. It includes information about the product features, benefits, and use cases.',
        price: 99.99,
        images: [
          '/images/product-1.jpg',
          '/images/product-2.jpg',
          '/images/product-3.jpg',
          '/images/product-4.jpg',
        ],
        rating: 4.5,
        reviewCount: 42,
        inStock: true,
        tags: ['new', 'featured', 'sale'],
        variants: ['Small', 'Medium', 'Large'],
        specifications: {
          'Material': 'Premium quality',
          'Dimensions': '10 x 5 x 2 inches',
          'Weight': '1.5 lbs',
          'Color': 'Multiple options available',
          'Warranty': '1 year'
        },
        reviews: [
          {
            id: '1',
            author: 'John Doe',
            rating: 5,
            date: '2025-03-15',
            content: 'Great product! Highly recommended.'
          },
          {
            id: '2',
            author: 'Jane Smith',
            rating: 4,
            date: '2025-03-10',
            content: 'Good quality but a bit pricey.'
          }
        ],
        faqs: [
          {
            question: 'How do I clean this product?',
            answer: 'Use a damp cloth with mild soap.'
          },
          {
            question: 'Is this product suitable for outdoor use?',
            answer: 'Yes, it is weather-resistant and can be used outdoors.'
          }
        ]
      };
      
      resolve(product);
    }, 500);
  });
}