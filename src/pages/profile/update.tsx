import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { UserDoc } from '../../../types/next-auth';
import getConfig from 'next/config';
import axios from 'axios';
import Auth from '@/components/auth';
import { AuthMode } from '@/constants/auth';
import { AuthContainer, Container } from '@/styles/pages/profile/update';
import { NEXT_SEO_DEFAULT } from '../../../next-seo-config';
import { NextSeo } from 'next-seo';
import headerConfig from '../api/header-config';

const { publicRuntimeConfig: config } = getConfig();

interface ProfileUpdatePageProps {
    user: UserDoc;
};

const ProfileUpdatePage = ({ user }: ProfileUpdatePageProps) => {
    return (
        <Container>
            <NextSeo 
                {...NEXT_SEO_DEFAULT}
            />
            <AuthContainer>
                <Auth mode={AuthMode.UPDATE} user={user} />
            </AuthContainer>
        </Container>
    );
}

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
    const session = await getServerSession(req, res, authOptions);

    if(!session?.jwt || !session?.user) {
        return {
            redirect: {
                permanent: true,
                destination: '/auth?mode=Login',
            },
            props: {
                isAuth: false,
            }
        }
    }

    const response = await axios.get(`${config?.BASE_URL}/${config?.USER}/${session?.user?.id}`, headerConfig(session?.jwt?.token as string));
    const user = response?.data?.payload?.user;
    
    return {
        props: {
            isAuth: true,
            user,
        }
    }
}

export default ProfileUpdatePage;