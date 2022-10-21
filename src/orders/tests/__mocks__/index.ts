import { OrdersEntity } from 'src/orders/entity/orders.entity';

export const ordersEntityList: OrdersEntity[] = [
  {
    id: '1',
    client_name: 'João',
    delivery_date: new Date('2023-07-05'),
    items_list_id: ['1', '2', '3'],
    total_amount: 125.99,
  },
  {
    id: '2',
    client_name: 'Maria',
    delivery_date: new Date('2022-09-13'),
    items_list_id: ['4', '6'],
    total_amount: 78.48,
  },
  {
    id: '3',
    client_name: 'José',
    delivery_date: new Date('2024-01-23'),
    items_list_id: ['5'],
    total_amount: 223.18,
  },
];

export const updatedOrderEntity = {
  client_name: 'João',
  delivery_date: new Date('2023-07-05'),
  items_list_id: ['1', '2', '3']
};
