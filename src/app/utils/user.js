import prisma from "../../../lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function createUserWithAccount({ name, email, password }) {
  try {
    const user = await prisma.user.create({
      data: {
        id: uuid(),
        name,
        email,
        password,
        accounts: {
          create: {
            type: "credentials",
            providerId: email,
            providerAccountId: uuidv4(),
          },
        },
      },
      include: {
        accounts: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
