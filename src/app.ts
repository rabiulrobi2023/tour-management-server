import express, { Application, Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/milddlewire/globalErrorHandler";
import { notFoundRoute } from "./app/milddlewire/notFoundRoute";
import cookieParser from "cookie-parser";
import "./app/config/passport";
import expressSession from "express-session";
import passport from "passport";
import { envVariable } from "./app/config/envConfig";

const app: Application = express();
app.use(
  expressSession({
    secret: envVariable.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:[envVariable.FORNTEND_URL]}));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Tour Management Server is Running");
});

app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;
