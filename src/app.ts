import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Application } from "express";
import notFoundHandler from "./app/middlewares/notFoundHandler";
import router from "./app/routes/index.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import config from "./app/config";

const app: Application = express();
// parser
app.use(express.json());
app.use(cors({ origin: [config.client_url as string], credentials: true }));
app.use(cookieParser());

app.get("/api/v1", (req, res) => {
  res.send("Hello World!");
});

// all route
app.use("/api/v1", router);
// handle global error handler
app.use(globalErrorHandler);

// handle 404 error
app.use(notFoundHandler);

export default app;
