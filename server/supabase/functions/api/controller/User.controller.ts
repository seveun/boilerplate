import { internalError, ok } from "@utils/response.ts";
import { HonoRequest } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import * as UserService from "@api/service/User.service.ts";
import { UserInfosSchema } from "@schema/user.schema.ts";

export const updateUser = async ({ req }: { req: HonoRequest }) => {
  try {
    const json = await req.json();
    const data = UserInfosSchema.parse(json);
    await UserService.updateUser(data, req.user);
    return ok({ data: "User updated" });
  } catch (error) {
    console.log(error);
    return internalError();
  }
};
