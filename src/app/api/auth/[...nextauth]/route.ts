import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import client from "@client";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
const mongoClient = client.connect()
export const authOptions: NextAuthOptions = {
    adapter : MongoDBAdapter(mongoClient,{
        collections: {
            Users: 'users',
            Sessions: 'sessions',
            Accounts: 'accounts',
            VerificationTokens: 'verification_requests'
        },
        databaseName: process.env.DB_NAME ,
    }) as any,
    providers: [
        GoogleProvider({
            clientId    : process.env.GOOGLE_CLIENT_ID as any,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as any,
        }),
    ],
    callbacks: {
        async redirect({url, baseUrl}) {
            return `${baseUrl}/admin`
        },
        async session({session, user}) {
            session.user.role = user?.role ?? 'USER';
            return session
        }
    }
}
const handler = NextAuth(authOptions);
export {handler as  GET, handler as POST}