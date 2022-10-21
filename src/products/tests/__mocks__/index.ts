import { ProductsEntity } from "src/products/entity/products.entity";

export const productsEntityList: ProductsEntity[] = [
  { id: '1', name: 'Product 1', price: 1.11, qty_stock: 111 },
  { id: '2', name: 'Product 2', price: 2.22, qty_stock: 222 },
  { id: '3', name: 'Product 3', price: 3.33, qty_stock: 333 },
];

export const updatedProductsEntity = {
  id: '1',
  name: 'Product 1',
  price: 1.11,
  qty_stock: 110,
};
