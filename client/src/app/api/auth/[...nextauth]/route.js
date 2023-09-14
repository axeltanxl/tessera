import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers : [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            type : "credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {},
            async authorize(credentials, req) {
              // Add logic here to look up the user from the credentials supplied
              if(!credentials.email || ! credentials.password){
                throw new Error("Please input an email an password");
              }
              console.log("credentials:", credentials);
              const user = await prisma.user.findFirst({
                where :{
                    email : credentials.email,
                }
              })
              console.log("User:", user)
              if (!user || !user?.password) {
                throw new Error("No user found");
              }

              const passwordMatch = await bcrypt.compare(
                credentials.password,
                user.password
              );

              if(!passwordMatch){
                throw new Error ("Incorrect password")
              }

              return user;
            }
          })
    ],

    callbacks :{
        async jwt({token, user, session}){
            console.log("jwt callback", {token, user, session})
            return token;
        },
        async session ({session, token, user}){
            console.log("session callback", {token, user, session})
            return session;
        },
    },

    secret : process.env.NEXTAUTH_SECRET,
    session : {
        strategy : "jwt"
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
        // async encode() {},
        // async decode() {},
      }
}

export const handler = NextAuth(authOptions);
export { handler as GET , handler as POST };