import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
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
            return session
        }
    }
}
const handler = NextAuth(authOptions);
export {handler as  GET, handler as POST}