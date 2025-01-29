import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      authorize: (credentials) => {
        if (
          credentials?.username === "adi" &&
          credentials?.password === "iloveseekha"
        ) {
          return {
            id: "1",
            name: "Aditya",
            email: "adi@nextauth.io",
          };
        } else {
          return null;
        }
      },
    }),
  ],
};
