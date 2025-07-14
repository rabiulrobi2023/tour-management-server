import express, { Application, Request, Response } from "express";
import cors from "cors";

import { router } from "./app/routes";
import { globalErrorHandler } from "./app/milddlewire/globalErrorHandler";
import { notFoundRoute } from "./app/milddlewire/notFoundRoute";

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Tour Management Server is Running");
});

app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;
