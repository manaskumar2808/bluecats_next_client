import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig: config } = getConfig();

export const authOptions: AuthOptions = {
    secret: process?.env?.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                userName: { label: 'Username', type: 'text', placeholder: 'eg. John@11' },
                password: { label: 'Password', type: 'password', placeholder: 'Strong password.' }
            },
            async authorize(credentials, req) {
                console.log('signing in', credentials);
                const body = {
                    userName: credentials?.userName,
                    password: credentials?.password,
                };
                const response = await axios.post(`${config?.BASE_URL}/${config?.LOGIN}`, body);
                if(response?.data?.error) {
                    console.log('Login failed!', response?.data?.error);
                    throw new Error(response?.data?.error || 'Login failed!');
                }
                return response?.data?.payload;
            }
        }),
    ],
    callbacks: {
        async jwt({ token: jwt, user: response }) {
            if(response) {
                jwt.token = response?.token;
                jwt.expiryDate = response?.expiryDate;
                jwt.user = response?.user;
            }
            return Promise.resolve(jwt);
        },
        async session({ session, token: jwt }) {
            session.user = jwt?.user;
            session.jwt = jwt;
            session.expires = jwt?.expiryDate as string;
            return Promise.resolve(session);
        }
    }
};

export default NextAuth(authOptions);