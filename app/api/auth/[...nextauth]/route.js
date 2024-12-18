import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
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
            authorization: {
                params: {
                  prompt: "consent", // Force consent screen
                  access_type: "offline" // Request refresh token
                }
              }
        })
    ],
    callbacks: {
        async session({ session }) {
            try {
                const sessionUser = await User.findOne({
                    email: session.user.email
                });
        
                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                }
        
                return session;
            } catch (error) {
                console.error("Session error:", error);
                return session;
            }
        },
        async signIn({ profile }) {
            try {
                await connectToDB();
        
                const userExists = await User.findOne({
                    email: profile.email
                });
        
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    });
                }
        
                return true;
            } catch (error) {
                console.error("Sign-in error:", error);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST}