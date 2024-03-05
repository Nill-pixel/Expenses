import { TypeUser } from "~/types/Types";
import { prisma } from "./database.server";
import { hash } from "bcrypt";
import { CustomError } from "./CustomError";

export const signup = async ({ email, password }: TypeUser) => {
  const existingUser = await prisma.user.findFirst({ where: { email } })

  if (existingUser) {
    const error = new CustomError('A user with provided email address exists already.', 422)
    throw error
  }
  
  const passwordHash = await hash(password, 12)

  await prisma.user.create({ data: { email, password: passwordHash } })
}