import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import * as UserController from "@api/controller/User.controller.ts";
import { auth } from "@api/middleware/auth.ts";

const app = new Hono();

app.patch("/", auth, UserController.updateUser);

export default app;
