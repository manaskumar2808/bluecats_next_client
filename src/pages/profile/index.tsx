import { Container, Username, Email, Name, Phone, Box, Display, Photo } from '@/styles/pages/profile';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { UserDoc } from '../../../types/next-auth';
import { ImageLoaderProps } from 'next/image';
import { getProfileImage } from '@/utility/profile';
import ArticleListing from '@/components/listing/article';
import { ArticleType } from '@/types/article';
import getConfig from 'next/config';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { RouteEnum } from '@/constants/route';
import { NextSeo } from 'next-seo';
import { NEXT_SEO_DEFAULT } from '../../../next-seo-config';

const { publicRuntimeConfig: config } = getConfig();

interface ProfilePageProps {
    user: UserDoc;
    articles: ArticleType[];
};

const ProfilePage = ({ user, articles }: ProfilePageProps) => {
    const router = useRouter();

    const goToUpdate = () => {
        router?.push(RouteEnum.UPDATE_PROFILE);
    }

    return (
        <Container>
            <NextSeo 
                {...NEXT_SEO_DEFAULT}
            />
            <Box>
                <Display>
                    <Photo loader={(img: ImageLoaderProps) => img?.src} src={getProfileImage(user?.rand)} alt={user?.userName} fill />
                </Display>
                {user?.userName && <Username>{user?.userName}</Username>}
                {user?.name && <Name>{user?.name}</Name>}
                {user?.email && <Email>{user?.email}</Email>}
                <Button onClick={goToUpdate} variant='dark'>Update</Button>
                {/* {user?.phone && <Phone>{user?.phone}</Phone>} */}
            </Box>
            <ArticleListing list={articles} legend='Your posts' />
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

    let response = await axios.get(`${config?.BASE_URL}/${config?.USER}/${session?.user?.id}`);
    const user = response?.data?.payload?.user;

    response = await axios.get(`${config?.BASE_URL}/${config?.ARTICLE}?user=${session?.user?.id}`);
    const articles = response?.data?.payload?.articles || [];

    return {
        props: {
            isAuth: true,
            user,
            articles,
        }
    }
}

export default ProfilePage;