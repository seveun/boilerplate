import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import * as HealthCheckController from "@api/controller/HealthCheck.controller.ts";

const healthCheck = new Hono();

healthCheck.get("/", HealthCheckController.get);

export default healthCheck;
