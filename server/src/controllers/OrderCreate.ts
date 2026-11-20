import { json, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import aysncHandler from "../utils/asyncHandler";
import Stripe from "stripe";
import { OrderItem } from "../models/orderSchema";
import temporaryCart from "../models/temCart";

//@route method - POST | path - api/create-order
//@desc create order and checkout session
//@access private/Login User

const stripe = Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2026-11-18.endive",
});

export const CreateOrderSession = aysncHandler(
  async (req: AuthRequest, res: Response) => {
    const { items, bill } = req.body;
    const customer = req.user;

    const line_items = items.map((item: OrderItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          metadata: {
            productId: item.productId,
            color: item.color,
            size: item.size,
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const tempCart = await temporaryCart.create({
      items,
      userId: customer?._id!,
    });

    const session = await stripe.checkout.sessions.create({
      allowed_payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/order-cancelled`,
      metadata: {
        userId: customer?._id.toString()!,
        email: customer?.email!,
        bill: bill.toString(),
        tempCartId: tempCart.id,
      },
    });

    res.status(200).json({ url: session.url });
  },
);
