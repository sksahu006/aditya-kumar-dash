// auth.config.ts
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
        // Replace this with your own authentication logic
        const user = { id: "1", username: "adi", password: "iloveseekha" };

        if (
          credentials?.username === "adi" &&
          credentials?.password === "iloveseekha"
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    // Set the session to expire after 30 minutes (in seconds)
    maxAge: 1 * 60,
  },
  // callbacks: {
  //   async redirect() {
  //     return process.env.NEXTAUTH_URL + '/dashboard'; 
  //   },
  // },
 
};

export default NextAuth(authConfig);
