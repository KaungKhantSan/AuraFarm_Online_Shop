export type Orderitem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
};

export type Order = {
  Id: string;
  userId: string;
  items: Orderitem[];
  bill: number;
  status: "paid" | "shipped" | "pending" | "cancelled" | "delivered";
  createdAt: string;
  customer: string;
};
