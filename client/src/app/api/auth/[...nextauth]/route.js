import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers : [
        CredentialsProvider({
            name : "credentials",
            credentials: {
                email : {label : "email", type : "text"},
                password : {label : "password", type : "password"},
            },
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
              console.log("Userplease: ", user)
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

            if(user){
                return {
                    ...token, 
                    user: user.user,
                };
            }
            return token;
        },
        async session ({session, token, user}){
            console.log("session callback", {token, user, session})
            if (token.user) {
                session.user = token.user;
              }
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