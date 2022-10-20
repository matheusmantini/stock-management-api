export class OrdersEntity {
  id: string;
  client_name: string;
  delivery_date: Date;
  items_list_id: string[];
  total_amount: number;
}
