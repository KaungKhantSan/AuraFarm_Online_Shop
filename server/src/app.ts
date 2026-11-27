import express, { json, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cooki_parser from "cookie-parser";
import { DBconnect } from "./db/DBconnect";
import UserRoute from "./routes/User";
import ProductRoute from "./routes/Product";
import OrderRoute from "./routes/Order";
import ErrorHandler from "./middlewares/ErrorHandler";
import Stripe from "stripe";
import TempCart from "./models/tempCart";
import Order from "./models/orderSchema";

dotenv.config({
  path: ".env",
});

const stripe = new Stripe(process.env.STRIPE_SECRET!);
const endpointSecret = process.env.WEBHOOK_SECRET;

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(cooki_parser());

app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event = req.body;
    // Get the signature sent by Stripe
    const signature = req.headers["stripe-signature"];
    try {
      // Verify the signature and parse the thin event notification
      event = stripe.webhooks.constructEvent(
        req.body,
        signature!,
        endpointSecret!,
      );
    } catch (err: any) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
    try {
      switch (event.type) {
        case "checkout.session.completed": {
          try {
            const session = event.data.object;
            console.log(event.data, session);

            const userId = session.metadata.customerId;
            const email = session.metadata.customer;
            const bill = Number(session.metadata.bill);
            const tempCartId = session.metadata.tempCartId;

            if (!userId || !email || !bill || !tempCartId) {
              throw new Error("Missing some metadata");
            }

            const tempCart = await TempCart.findById(tempCartId);

            if (!tempCart) {
              throw new Error(`Temporary cart not found: ${tempCartId}`);
            }

            await Order.create({
              userId,
              customer: email,
              bill: bill,
              paymentIntentId: session.payment_intent,
              stripeSessionId: session.id,
              items: tempCart?.items,
              status: "paid",
            });

            await TempCart.findByIdAndDelete(tempCartId);
          } catch (err) {
            console.log(err);
          }
          break;
        }
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`);
      }
    } catch (err: any) {
      console.log(`Webhook handler failed.`, err.message);
      return res.sendStatus(500);
    }
    // Return a 200 response to acknowledge receipt of the event
    res.send();
  },
);

app.use(json());

//routes
app.use("/api", UserRoute);
app.use("/api", ProductRoute);
app.use("/api", OrderRoute);

app.use(ErrorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  //DB connection
  DBconnect();
  console.log("Server is ruuning on", PORT);
});

// stripe listen --forward-thin-to localhost:4000/stripe/webhook --thin-events "*"

// stripe trigger checkout.session.completed
