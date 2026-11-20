import express, { json, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cooki_parser from "cookie-parser";
import { DBconnect } from "./db/DBconnect";
import UserRoute from "./routes/User";
import ProductRoute from "./routes/Product";
import OrderRoute from "./routes/Order";
import ErrorHandler from "./middlewares/ErrorHandler";
import stripe from "stripe";
import temporaryCart from "./models/temCart";
import Order from "./models/orderSchema";

dotenv.config({
  path: ".env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.use(cooki_parser());

app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    console.log("Stripe webhook is online.");

    let event = req.body;
    if (endpointSecret) {
      const signature = req.headers["stripe-signature"];
      try {
        if (!signature) {
          throw new Error("Signature not found.");
        }
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret,
        );
      } catch (err: any) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        res.sendStatus(400);
        return;
      }
    }

    switch (event.type) {
      case "checkout.session.completed":
        console.log("EVENT TYPE===>", event.type);

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

          const tempCart = await tempCartId.findById(tempCartId);

          await Order.create({
            userId,
            customer: email,
            bill: bill,
            paymentIntentId: session.payment_intent,
            stripeSessionId: session.id,
            items: tempCart?.items,
            status: "paid",
          });

          await tempCartId.findByIdAndDelete(tempCartId);
        } catch (err) {
          console.log(err);
        }
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    res.sendStatus(200);
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

// stripe listen --forward-thin-to localhost:4000/webhook --thin-events "*"

// stripe trigger checkout.session.completed
