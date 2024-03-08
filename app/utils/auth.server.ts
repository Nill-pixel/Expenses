import { TypeUser } from "~/types/Types";
import { prisma } from "./database.server";
import { hash, compare } from "bcrypt";
import { CustomError } from "./CustomError";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET as string
const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true
  }
})

export const getUserFromSession = async (request: Request) => {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))
  const userId = session.get('userId') as string

  if (!userId) {
    return null
  }
  return userId
}

const createUserSession = async (userId: string, redirectPath: string) => {
  const session = await sessionStorage.getSession()
  session.set('userId', userId)
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session)
    }
  })
}

export const destroyUserSession = async (request: Request) => {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  )

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session)
    }
  })

}

export const requiredUserSession = async (request: Request) => {
  const userId = await getUserFromSession(request)
  if (!userId) {
    throw redirect('/auth?mode=login');
  }
  return userId
}


export const signup = async ({ email, password }: TypeUser) => {
  const existingUser = await prisma.user.findFirst({ where: { email } })

  if (existingUser) {
    const error = new CustomError('A user with provided email address exists already.', 422)
    throw error
  }

  const passwordHash = await hash(password, 12)

  const user = await prisma.user.create({ data: { email, password: passwordHash } })
  return createUserSession(user.id, '../../expenses')
}

export const login = async ({ email, password }: TypeUser) => {
  const existingUser = await prisma.user.findFirst({ where: { email } })

  if (!existingUser) {
    const error = new CustomError('Could not log you in, please check the provided credentials.', 401)
    throw error
  }

  const passwordCorret = await compare(password, existingUser.password)

  if (!passwordCorret) {
    const error = new CustomError('Could not log you in, please check the provided credentials.', 401)
    throw error
  }

  return createUserSession(existingUser.id, '../../expenses')
}