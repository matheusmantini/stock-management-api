export class OrdersEntity {
  id: string;
  client_name: string;
  delivery_date: Date;
  items_list_id: string[];
  total_amount: number;
}

export class OrderItemEntity {
  item_list_id: string;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  total: number;
}

export class ProductList {
  id: string;
  name: string;
  price: number;
  qty_stock: number;
}

export class OrderItemListEntity {
  id: string;
  name: string;
  price: number;
  qty_stock: number;
}

export class OrderShoppingListItem {
  itemListId: string;
  product: string;
  quantity: number;
  price: number;
}

export class OrdersEntityList {
  id: string;
  client_name: string;
  delivery_date: Date;
  shopping_list: OrderShoppingListItem[];
  total_amount: number;
}
