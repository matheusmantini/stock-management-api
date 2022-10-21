import { ItemsListEntity } from 'src/items-list/entity/items-list.entity';

export const itemsListEntityList: ItemsListEntity[] = [
  {
    items_list_id: '1',
    product_id: '1',
    product_name: 'AZEITE',
    price: 25.0,
    quantity: 5,
    total: 125.0,
  },
  {
    items_list_id: '2',
    product_id: '2',
    product_name: 'ÁGUA MINERAL',
    price: 3.0,
    quantity: 10,
    total: 30.0,
  },
  {
    items_list_id: '3',
    product_id: '3',
    product_name: 'COPO AMERICANO',
    price: 15.0,
    quantity: 15,
    total: 150.0,
  },
];

export const updatedItemsListEntity = {
  id: '1',
  product_id: '1',
  quantity: 5,
};
