import { Cart } from "@/types/cart";



// This is a mock API function. In a real application, this would call a backend API
export async function getCart(): Promise<Cart | null> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock cart data
      const cart: Cart = {
        id: 'cart-123',
        items: [
          {
            id: 'item-1',
            product: {
              id: 'product-1',
              name: 'Example Product 1',
              description: 'This is an example product with a short description.',
              price: 99.99,
              images: ['https://res.cloudinary.com/dbpexd7oc/image/upload/v1745002396/lace-up-comfortable-leather-casual-shoe-brown_1_f1wj1g.jpg'],
              rating: 4.5,
              reviewCount: 42,
              inStock: true
            },
            quantity: 2
          },
          {
            id: 'item-2',
            product: {
              id: 'product-2',
              name: 'Example Product 2',
              description: 'Another example product with a short description.',
              price: 49.99,
              images: ['https://res.cloudinary.com/dbpexd7oc/image/upload/v1744878147/a9yth5xaog-1744878140473-category-Image-fashion-shoes-sneakers.jpg'],
              rating: 4.0,
              reviewCount: 28,
              inStock: true
            },
            quantity: 1,
            variant: 'Medium'
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      resolve(cart);
    }, 500);
  });
}