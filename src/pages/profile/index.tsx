import { Container, Username, Email, Name, Phone, Box } from '@/styles/pages/profile';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { UserDoc } from '../../../types/next-auth';

interface ProfileProps {
    user: UserDoc,
};

const Profile = ({ user }: ProfileProps) => {
    return (
        <Container>
            <Box>
                {user?.userName && <Username>{user?.userName}</Username>}
                {user?.name && <Name>{user?.name}</Name>}
                {user?.email && <Email>{user?.email}</Email>}
                {user?.phone && <Phone>{user?.phone}</Phone>}
            </Box>
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

    return {
        props: {
            user: session?.user,
            isAuth: true,
        }
    }
}

export default Profile;