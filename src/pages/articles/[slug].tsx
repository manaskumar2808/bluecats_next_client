import Article from '@/components/article';
import { Container } from '@/styles/pages/articles/details';
import { ArticleType } from '@/types/article';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import getConfig from 'next/config';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { useRouter } from 'next/router';
import { NEXT_SEO_DEFAULT } from '../../../next-seo-config';

const { publicRuntimeConfig: config } = getConfig();

interface ArticleDetailsPageProps {
    article: ArticleType,
};

const ArticleDetailsPage = ({ article }: ArticleDetailsPageProps) => {
    const router = useRouter();
    const currentUrl = router.asPath;

    return (
        <Container>
            <NextSeo 
                {...NEXT_SEO_DEFAULT}
                title={article?.title}
                openGraph={{
                    type: 'article',
                    article: {
                        publishedTime: article?.createdAt,
                        modifiedTime: article?.updatedAt,
                        authors: [
                            article?.author?.name || '',
                        ],
                    },
                    images: [
                        {
                            url: article?.image || '',
                            alt: article?.title || '',
                        }
                    ],
                }}
            />
            <ArticleJsonLd 
                url={currentUrl}
                type='Article'
                title={article?.title}
                images={[
                    article?.image || '',
                ]}
                authorName={article?.author?.name || ''}
                datePublished={article?.createdAt as string}
                dateModified={article?.updatedAt as string}
                description={article?.content}
            />
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