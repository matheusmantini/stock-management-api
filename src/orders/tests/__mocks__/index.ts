import {
  OrderItemEntity,
  OrdersEntity,
  OrdersEntityList,
  ProductList,
} from 'src/orders/entity/orders.entity';

export const productsList: ProductList[] = [
  {
    id: '1',
    name: 'ENERGÉTICO RED BULL ENERGY DRINK 355ML',
    price: 10.0,
    qty_stock: 220
  },
  {
    id: '2',
    name: 'PAPEL TOALHA SNOB C/ 2UN',
    price: 5.0,
    qty_stock: 330
  }
]

export const orderItem: OrderItemEntity[] = [
  {
    item_list_id: '1',
    product_id: '1',
    product_name: 'ENERGÉTICO RED BULL ENERGY DRINK 355ML',
    price: 10.0,
    quantity: 25,
    total: 250.0,
  },
  {
    item_list_id: '2',
    product_id: '2',
    product_name: 'PAPEL TOALHA SNOB C/ 2UN',
    price: 5.0,
    quantity: 10,
    total: 50.0,
  },
  {
    item_list_id: '1',
    product_id: '1',
    product_name: 'ENERGÉTICO RED BULL ENERGY DRINK 355ML',
    price: 10.0,
    quantity: 25,
    total: 250.0,
  },
  {
    item_list_id: '2',
    product_id: '2',
    product_name: 'PAPEL TOALHA SNOB C/ 2UN',
    price: 5.0,
    quantity: 10,
    total: 50.0,
  },
];

export const ordersEntityList: OrdersEntity[] = [
  {
    id: '1',
    client_name: 'João',
    delivery_date: new Date('2023-07-05'),
    items_list_id: ['1', '2'],
    total_amount: 300.0,
  },
  {
    id: '2',
    client_name: 'Maria',
    delivery_date: new Date('2023-04-23'),
    items_list_id: ['1'],
    total_amount: 250.0,
  },
  {
    id: '3',
    client_name: 'José',
    delivery_date: new Date('2023-02-11'),
    items_list_id: ['2'],
    total_amount: 50.0,
  },
];

export const ordersEntityListResult: OrdersEntityList[] = [
  {
    id: '1',
    client_name: 'João',
    delivery_date: new Date('2023-07-05'),
    shopping_list: [
      {
        itemListId: '1',
        product: 'ENERGÉTICO RED BULL ENERGY DRINK 355ML',
        quantity: 25,
        price: 10.0,
      },
      {
        itemListId: '2',
        product: 'PAPEL TOALHA SNOB C/ 2UN',
        quantity: 10,
        price: 5,
      },
    ],
    total_amount: 300.0,
  },
  {
    id: '2',
    client_name: 'Maria',
    delivery_date: new Date('2023-04-23'),
    shopping_list: [
      {
        itemListId: '1',
        product: 'ENERGÉTICO RED BULL ENERGY DRINK 355ML',
        quantity: 25,
        price: 10.0,
      },
    ],
    total_amount: 250.0,
  },
  {
    id: '3',
    client_name: 'José',
    delivery_date: new Date('2023-02-11'),
    shopping_list: [
      {
        itemListId: '2',
        product: 'PAPEL TOALHA SNOB C/ 2UN',
        quantity: 10,
        price: 5,
      },
    ],
    total_amount: 50.0,
  },
];

export const updatedOrderEntity = {
  client_name: 'João',
  delivery_date: new Date('2023-07-05'),
  items_list_id: ['1', '2', '3'],
};
