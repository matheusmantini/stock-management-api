import {
  AllItemsListEntity,
  ItemsListEntity,
  ItemsListEntityResult,
  ProductById,
} from 'src/items-list/entity/items-list.entity';

export const productById: ProductById[] = [
  {
    id: '1',
    name: 'AZEITE',
    price: 25.0,
    qty_stock: 528,
  },
  {
    id: '2',
    name: 'ÁGUA MINERAL',
    price: 3.0,
    qty_stock: 323,
  },
  {
    id: '3',
    name: 'COPO AMERICANO',
    price: 15.0,
    qty_stock: 428,
  },
];

export const allItemsListEntity: AllItemsListEntity[] = [
  {
    id: '11',
    product_id: '1',
    quantity: 3,
  },
  {
    id: '22',
    product_id: '2',
    quantity: 2,
  },
  {
    id: '33',
    product_id: '3',
    quantity: 1,
  },
];

export const itemsListEntityResult: ItemsListEntityResult[] = [
  {
    item_list_id: '11',
    product_id: '1',
    product_name: 'AZEITE',
    price: 25.0,
    quantity: 3,
    total: 75.0,
  },
  {
    item_list_id: '22',
    product_id: '2',
    product_name: 'ÁGUA MINERAL',
    price: 3.0,
    quantity: 10,
    total: 30.0,
  },
  {
    item_list_id: '33',
    product_id: '3',
    product_name: 'COPO AMERICANO',
    price: 15.0,
    quantity: 15,
    total: 225.0,
  },
];

export const itemsListEntityList: ItemsListEntity[] = [
  {
    id: '11',
    product_id: '1',
    product_name: 'AZEITE',
    price: 25.0,
    quantity: 3,
    total: 75.0,
  },
  {
    id: '22',
    product_id: '2',
    product_name: 'ÁGUA MINERAL',
    price: 3.0,
    quantity: 10,
    total: 30.0,
  },
  {
    id: '33',
    product_id: '3',
    product_name: 'COPO AMERICANO',
    price: 15.0,
    quantity: 15,
    total: 225.0,
  },
];

export const updatedItemsListEntity = {
  id: '1',
  product_id: '1',
  quantity: 5,
};
