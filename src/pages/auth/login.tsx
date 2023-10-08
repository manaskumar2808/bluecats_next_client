import Auth from '@/components/auth';
import { AuthMode } from '@/constants/auth';
import { AuthContainer, Container } from '@/styles/pages/auth';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

const AuthPage = () => {
    return (
        <Container>
            <AuthContainer>
                <Auth mode={AuthMode.LOGIN} />
            </AuthContainer>
        </Container>
    );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getServerSession(context?.req, context?.res, authOptions);
    
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
    
    return {
        props: {
            isAuth: false,
        },
    }
}

export default AuthPage;