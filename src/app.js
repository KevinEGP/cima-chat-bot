import express from "express";
import axios from "axios";
import webhookRouter from "./routes/webhook.js";

export const app = express();

app.use(express.json());
app.use("/webhook", webhookRouter);

// Health check route
app.get("/", (_, res) => res.send("✅ WhatsApp Bot is up and running!"));
