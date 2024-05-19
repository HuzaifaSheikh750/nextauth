import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../lib/prisma";

export const options = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const user = {
          id: 1,
          name: "admin",
          email: "admin@gmail.com",
          password: "123",
        };

        const { email, password } = credentials;
        if (email === user.email && password === user.password) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
