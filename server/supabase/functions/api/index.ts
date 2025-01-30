import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import { cors } from "https://deno.land/x/hono@v4.3.11/middleware.ts";
import routes from "@api/routes/index.ts";

const app = new Hono();

app.use("/api/*", cors());
app.route("/api", routes);

Deno.serve(app.fetch);
