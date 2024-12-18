import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/database';
import { connect } from 'mongoose';

console.log({
    clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({ session }){

    },
    async signIn({ profile }){
        try
        {
            //Serverless route
            await connectToDB();

            //Check if a user already exists

            //If not, create a new user and save it to the database

            //Succesful sign in
            return true;
        }
        catch(error)
        {
            return false;
        }
    }
})

export { handler as GET, handler as POST}