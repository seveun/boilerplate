import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import HealthCheckRoutes from "@api/routes/HealthCheck.route.ts";
import UserRoutes from "@api/routes/User.route.ts";

const app = new Hono();

app.route("/health-check", HealthCheckRoutes);
app.route("/user", UserRoutes);

export default app;
