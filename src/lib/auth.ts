import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import { findUserByEmail } from "./dbActions/user";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signIn",
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "lucas@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await findUserByEmail(credentials.email);

        if (!existingUser) {
          return null;
        }

        const checkPassword = await compare(
          credentials.password,
          existingUser.password
        );

        if (!checkPassword) return null;

        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
  ],
};
