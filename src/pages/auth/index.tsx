import Auth from '@/components/auth';
import { AuthMode } from '@/constants/auth';
import { RouteEnum } from '@/constants/route';
import { AuthContainer, Container } from '@/styles/pages/auth';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authOptions } from '../api/auth/[...nextauth]';

const AuthPage = () => {
    const searchParams = useSearchParams();
    const modeParam = searchParams.get('mode') as AuthMode;
    const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);

    useEffect(() => {
        setMode(modeParam);
    }, [modeParam]);

    return (
        <Container>
            <AuthContainer>
                <Auth isLogin={mode === AuthMode.LOGIN} setMode={setMode} />
            </AuthContainer>
        </Container>
    );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getServerSession(context?.req, context?.res, authOptions);
    console.log('session', session);
    if(session?.jwt && session?.user) {
        return {
            redirect: {
                permanent: true,
                destination: '/',
            },
            props: {
                isAuth: true,
            },
        }
    }

    const mode = context?.query?.mode || AuthMode.LOGIN;
    return {
        props: {
            login: mode === AuthMode.LOGIN,
            isAuth: false,
        },
    }
}

export default AuthPage;