import mongoose, { Schema, Types } from "mongoose";

export interface OrderItem {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

export interface OrderDocument extends Document {
  userId: Types.ObjectId;
  items: OrderItem[];
  bill: number;
  status: "paid" | "cancelled" | "delivered" | "shipped" | "pending";
  paymentIntentId?: string;
  stripeSessionId?: string;
  customer: string;
  createAt: Date;
  updatedAt: Date;
}

export const OrderItemSchema = new Schema<OrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
  },
  { _id: false },
);

const OrderDocumentSchema = new Schema<OrderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [OrderItemSchema], required: true },
    bill: { type: Number, required: true },
    status: {
      type: String,
      enum: ["paid", "cancelled", "delivered", "shipped", "pending"],
      default: "pending",
    },
    paymentIntentId: { type: String },
    stripeSessionId: { type: String },
    customer: { type: String, required: true },
  },
  { timestamps: true },
);

const Order = mongoose.model<OrderDocument>("Order", OrderDocumentSchema);
export default Order;
