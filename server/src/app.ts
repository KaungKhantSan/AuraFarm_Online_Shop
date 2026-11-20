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

app.use(json());
app.use(cooki_parser());

//routes
app.use("/api", UserRoute);
app.use("/api", ProductRoute);
app.use("/api", OrderRoute);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
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

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object;
          const userId = session.metadata.userId;
          const email = session.metadata.email;
          const bill = Number(session.metadata.bill);
          const tempCartId = session.metadata.tempCartId;

          const tempCart = await temporaryCart.findById(tempCartId);

          await Order.create({
            userId,
            customer: email,
            bill: bill,
            paymentIntentId: session.payment_intent,
            stripeSessionId: session.id,
            items: tempCart?.items!,
            status: "paid",
          });

          await temporaryCart.findByIdAndDelete(tempCartId);

          break;
        }
        default:
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

app.use(ErrorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  //DB connection
  DBconnect();
  console.log("Server is ruuning on", PORT);
});

// stripe listen --forward-thin-to localhost:4000/webhook --thin-events "*"

// stripe trigger checkout.session.completed
