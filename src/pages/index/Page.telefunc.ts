import { Request, Response } from "express";
import { getContext } from "telefunc";

type Ctx = {
  req: Request;
  res: Response;
};

export async function getProfile() {
  const { req } = getContext<Ctx>();
  console.log(req.session?.isPopulated);

  if (!req.session?.isPopulated) {
    return null;
  }

  return { id: "my-user-id" };
}

export async function login() {
  const { req } = getContext<Ctx>();
  req.session = { id: "my-user-id" };
}

export async function logout() {
  const { req } = getContext<Ctx>();
  req.session = null;
}
