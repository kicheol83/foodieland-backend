import cors from "cors";
import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { MORGAN_FORMAT } from "./libs/config";
import Authrouter from "./config/auth.router";

/* 1-ENTRANCE*/
const app = express();
app.use(Authrouter);
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: ["http://72.60.107.80:3015"] }));
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));
/* 2-SESSIONS*/
// app.use((req, res, next) => {
//   res.locals.member = req.cookies.member;
//   next();
// });

/* 3-VIEWS*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* 4-ROUTERS*/
// SSR: EJS ADMIKA
app.use("/admin", routerAdmin); // SSR: EJS
app.use("/", router); // SPA: REACT

export default app;
