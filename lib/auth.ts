import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: NextAuthOptions = {
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
      async authorize(credentials) {
        console.log("Authorize function called with credentials:", credentials);

        const user = { id: "1", username: "adi", password: "iloveseekha" };

        if (
          credentials?.username === user.username &&
          credentials?.password === user.password
        ) {
          console.log("Authentication successful");
          return user;
        } else {
          console.log("Authentication failed");
          return null;
        }
      },
    }),
  ],
  session: {
    maxAge: 30 * 60, // 30 minutes
  },
  debug: true, // Enable debug mode to see more logs
};

export default NextAuth(authConfig);
