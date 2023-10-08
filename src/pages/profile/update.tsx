import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { UserDoc } from '../../../types/next-auth';
import getConfig from 'next/config';
import axios from 'axios';
import Auth from '@/components/auth';
import { AuthMode } from '@/constants/auth';
import { AuthContainer, Container } from '@/styles/pages/profile/update';

const { publicRuntimeConfig: config } = getConfig();

interface ProfileUpdateProps {
    user: UserDoc;
};

const ProfileUpdate = ({ user }: ProfileUpdateProps) => {
    return (
        <Container>
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

    const response = await axios.get(`${config?.BASE_URL}/${config?.USER}/${session?.user?.id}`);
    const user = response?.data?.payload?.user;
    
    return {
        props: {
            isAuth: true,
            user,
        }
    }
}

export default ProfileUpdate;