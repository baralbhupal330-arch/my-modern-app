// Shared types for the e-commerce app

export interface User {
  id: string;
  email: string;
  name: string | null;
  password?: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED';
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}
