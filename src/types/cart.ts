export type TOrderItem = {
  productId: string;
  productSKU: string;
  productName: string;
  category: string;
  brand?: string;
  discount?: number;
  purchasePrice: number;
  sellingPrice: number;
  variant: string;
  size?: string;
  color?: string;
  quantity: number;
  image: string;
};

export type TCustomerInfo = {
  customerId: string;
  customerName: string;
  contactNumber: string;
  email?: string;
  city: string;
  district: string;
  address: string;
};
