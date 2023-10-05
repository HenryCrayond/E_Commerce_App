/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { AllProduct, ProductItems } from "../App";
interface Counter {
  count: number;
  addCount: (by: number) => void;
}

interface ProductStore {
  products: any;
  addProduct: (item: ProductItems) => void;
  deleteProduct: (id: number) => void;
  updateProduct: (item: ProductItems, index: number) => void;
}
interface GetProduct {
  storeProduct: AllProduct;
  getFetchData: (item: ProductItems) => void;
}
interface Product {
  id?: number;
  price?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  title?: string;
  thumbnail?: string;
  category?: string;
  description?: string;
  discountPercentage?: number;
  images?: string[];
}

export const getAllProductStore = create<GetProduct>((set) => ({
  storeProduct: [],
  getFetchData: (products: Product) => set(() => ({ storeProduct: products })),
}));

export const productStore = create<ProductStore>((set) => ({
  products: [],
  addProduct: (products: Product) =>
    set((prev: ProductStore) => ({ products: [...prev.products, products] })),
  deleteProduct: (id: number) =>
    set((prev: ProductStore) => ({
      products: prev.products.filter((pro: ProductItems) => pro?.id !== id),
    })),
  updateProduct: (products: Product, i: number) =>
    set((prev: ProductStore) => ({
      products: prev.products.filter((val: AllProduct) =>
        val.id === products.id ? prev.products[i] : products
      ),
    })),
}));

export const showCountStore = create<Counter>((set) => ({
  count: 6,
  addCount: (by: number) =>
    set((prev: Counter) => ({ count: prev.count + by })),
}));
