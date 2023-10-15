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
import headerConfig from '../api/header-config';

const { publicRuntimeConfig: config } = getConfig();

interface ProfilePageProps {
    user: UserDoc;
    articles: ArticleType[];
    drafts: ArticleType[];
};

const ProfilePage = ({ user, articles, drafts }: ProfilePageProps) => {
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
            {drafts?.length > 0 && <ArticleListing list={drafts} legend='Your drafts' />}
            {articles?.length > 0 && <ArticleListing list={articles} legend='Your posts' />}
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

    const token = session?.jwt?.token as string;

    let response = await axios.get(`${config?.BASE_URL}/${config?.USER}/${session?.user?.id}`, headerConfig(token));
    const user = response?.data?.payload?.user;

    response = await axios.get(`${config?.BASE_URL}/${config?.ARTICLE}?user=${session?.user?.id}`, headerConfig(token));
    const articles = response?.data?.payload?.articles || [];

    response = await axios.get(`${config?.BASE_URL}/${config?.DRAFT}`, headerConfig(token));
    const drafts = response?.data?.payload?.drafts || [];

    return {
        props: {
            isAuth: true,
            user,
            articles,
            drafts,
        }
    }
}

export default ProfilePage;