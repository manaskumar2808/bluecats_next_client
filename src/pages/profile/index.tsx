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
import Profile from '@/components/profile';

const { publicRuntimeConfig: config } = getConfig();

interface ProfilePageProps {
    user: UserDoc;
    self: boolean;
    articles: ArticleType[];
    drafts: ArticleType[];
};

const ProfilePage = ({ user, self, articles, drafts }: ProfilePageProps) => {
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
                <Profile user={user} radius={75} />
                {user?.userName && <Username>{user?.userName}</Username>}
                {user?.name && <Name>{user?.name}</Name>}
                {user?.email && <Email>{user?.email}</Email>}
                {self && <Button onClick={goToUpdate} variant='dark'>Update</Button>}
            </Box>
            {self && drafts?.length > 0 && <ArticleListing list={drafts} legend={self ? 'Your drafts' : `${user?.userName}'s drafts`} />}
            {articles?.length > 0 && <ArticleListing list={articles} legend={self ? 'Your posts' : `${user?.userName}'s posts`} />}
        </Container>
    );
}

export const getServerSideProps = async ({ req, res, query }: GetServerSidePropsContext) => {
    try {
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
        const userName = query?.username;
        
        let response, user;
        
        if(userName) {
            response = await axios.get(`${config?.BASE_URL}/${config?.USER}?username=${userName}`);
            user = response?.data?.payload?.user;
        
            if(!user)
                throw new Error('User not found!');
        } else {
            response = await axios.get(`${config?.BASE_URL}/${config?.USER}/${session?.user?.id}`, headerConfig(token));
            user = response?.data?.payload?.user;
        }
        
        const self = session?.user?.id === user?.id;
        
        response = await axios.get(`${config?.BASE_URL}/${config?.ARTICLE}?user=${user?.id}`, headerConfig(token));
        const articles = response?.data?.payload?.articles || [];
        let drafts = [];
        
        if(self) {
            response = await axios.get(`${config?.BASE_URL}/${config?.DRAFT}`, headerConfig(token));
            drafts = response?.data?.payload?.drafts || [];
        }
        
        return {
            props: {
                isAuth: true,
                user,
                articles,
                drafts,
                self,
            }
        }
    } catch(err) {
        return {
            redirect: {
                permanent: true,
                destination: '/404',
            }
        }
    }
}

export default ProfilePage;