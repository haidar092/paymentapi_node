import express from "express";
import dotenv from "dotenv";

import { Client } from "square";
import cors from "cors";

import uuid from "uuid-random";

const app = express();
dotenv.config();
const allowedOrigins = ['http://localhost:3000'];
const PORT = process.env.PORT || 6000;
const options = {
  origin: allowedOrigins
};
app.use(cors(options));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});

const { paymentsApi } = new Client({
  accessToken:
    "EAAAEB_W-uThQ3_Z9X8Y8x7umZF1wGOc9_lJ5n3DYxRAZpMwaYpQzm3Gc5q4X_bR",
  environment: "sandbox",
});
app.post("/process-payment", async (req, res) => {
  if (req.method === "POST") {
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: uuid(),
      sourceId: "cnon:CBASELi59OPJBY8lt4-zlUXSKRQ",
      amountMoney: {
        currency: "GBP",
        amount: 400,
      },
    });

    console.log(result);
    res.status(200).send(result);
  } else {
    res.status(500).send({ message: "error" });
  }
});

app.listen(PORT, console.log(`app listen on PORT ${PORT}`));
