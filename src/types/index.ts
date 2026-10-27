export interface Product {
  'products id': string;
  'product name': string;
  category: string;
  stock: string | number;
  image: string;
  price?: string | number;
}

export interface ProductNormalized {
  id: string;
  name: string;
  category: string;
  stock: number;
  image: string;
  price?: number;
}

export interface OrderPayload {
  sheet: 'orders';
  'product id': string;
  quantity: number;
  price: number;
  'phone number': string;
  name: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  category: string;
  price?: number;
  quantity: number;
  image: string;
  stock: number;
}

export interface CustomerInfo {
  name: string;
  phoneNumber: string;
  address?: string;
}
