import { Request, Response } from "express";
import t from "telefunc";

type Ctx = {
  req: Request;
  res: Response;
};

export async function onGetProfile() {
  const { req } = t.getContext<Ctx>();

  if (!req.session?.isPopulated) {
    return null;
  }

  return { id: "my-user-id" };
}

export async function onLogin() {
  const { req } = t.getContext<Ctx>();
  req.session = { id: "my-user-id" };
}

export async function onLogout() {
  const { req } = t.getContext<Ctx>();
  req.session = null;
}

export async function onGetProtectedResource() {
  const { req } = t.getContext<Ctx>();
  const userId = req.session?.id;

  if (!userId) {
    throw t.Abort({ message: "Not logged in" });
  }

  return { name: "Area 51" };
}
