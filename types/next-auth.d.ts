import NextAuth from "next-auth";
import { JWT } from 'next-auth/jwt';

interface UserDoc {
    id: string;
    userName: string;
    email?: string | undefined;
    name?: string | undefined;
    phone?: string | undefined;
    rand?: number;
};

declare module 'next-auth' {
    interface Session {
        user: UserDoc | undefined,
        jwt: JWT | undefined,
    };

    interface User {
        user: UserDoc;
        token: string;
        expiryDate: string;
    };
}

declare module 'next-auth/jwt' {
    interface JWT {
        user: UserDoc;
        token: string | undefined;
        expiryDate: string | undefined;
    }
}