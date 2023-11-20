import { Router } from "express";
import { login, register } from "../Controller/Auth.js";

const route = Router();

route.post("/register", register);
route.post("/login", login);

export default route