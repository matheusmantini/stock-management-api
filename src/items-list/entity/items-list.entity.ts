export class ItemsListEntityResult {
  item_list_id: string;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  total: number;
}

export class ItemsListEntity {
  id: string;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  total: number;
}

export class AllItemsListEntity {
  id: string;
  product_id: string;
  quantity: number;
}

export class ProductById {
  id: string;
  name: string;
  price: number;
  qty_stock: number;
}