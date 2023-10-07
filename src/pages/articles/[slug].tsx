import Article from '@/components/article';
import { Container } from '@/styles/pages/articles/details';
import { ArticleType } from '@/types/article';
import axios from 'axios';
import { GetServerSidePropsContext, GetStaticPathsContext, GetStaticPropsContext } from 'next';
import getConfig from 'next/config';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

const { publicRuntimeConfig: config } = getConfig();

interface ArticleDetailsPageProps {
    article: ArticleType,
};

const ArticleDetailsPage = ({ article }: ArticleDetailsPageProps) => {
    return (
        <Container>
            <Article article={article} />
        </Container>
    );
}

export async function getServerSideProps({ req, res, params }: GetServerSidePropsContext) {
    const session = await getServerSession(req, res, authOptions);
    const title = params?.['slug'] as string;
    const encodedTitle = title && encodeURIComponent(title);
    const response = await axios.get(`${config?.BASE_URL}/${config?.ARTICLE}/${encodedTitle}`);
    const article = response?.data?.payload?.article;

    console.log('article', article);

    if(!article) {
        return {
            redirect: {
                permanent: true,
                destination: '/404',
            },
        }
    }

    return {
        props: {
            article,
            isAuth: (session && session?.jwt && session?.user),
        },
    };
}

export default ArticleDetailsPage;