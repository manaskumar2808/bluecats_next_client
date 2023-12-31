import Article from '@/components/article';
import { Container } from '@/styles/pages/articles/details';
import { ArticleType } from '@/types/article';
import axios from '@/pages/api/axios-config';
import { GetServerSidePropsContext } from 'next';
import getConfig from 'next/config';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { NEXT_SEO_DEFAULT } from '../../../next-seo-config';
import headerConfig from '../api/header-config';
import { getContentFromArticle } from '@/utility/article';
import { AppConstants } from '@/constants';

const { publicRuntimeConfig: config } = getConfig();

interface ArticleDetailsPageProps {
    article: ArticleType,
};

const ArticleDetailsPage = ({ article }: ArticleDetailsPageProps) => {
    let currentUrl = '';
    if(typeof window !== 'undefined')
        currentUrl = window?.location?.href;

    console.log('article', article);

    return (
        <Container>
            <NextSeo 
                {...NEXT_SEO_DEFAULT}
                title={article?.title}
                openGraph={{
                    type: 'article',
                    url: currentUrl,
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
                publisherLogo='/logo/cat-32.ico'
                publisherName={AppConstants.NAME}
                authorName={article?.author?.name || ''}
                datePublished={article?.createdAt as string}
                dateModified={article?.updatedAt as string}
                description={getContentFromArticle(article)}
            />
            {article && <Article article={article} url={currentUrl} />}
        </Container>
    );
}

export async function getServerSideProps({ req, res, params }: GetServerSidePropsContext) {
    try {
        const session = await getServerSession(req, res, authOptions);
        const title = params?.['slug'] as string;
        const encodedTitle = title && encodeURIComponent(title);
        const response = await axios.get(`${config?.BASE_URL}/${config?.ARTICLE}/${encodedTitle}`, headerConfig(session?.jwt?.token as string));
        const article = response?.data?.payload?.article;
        
        if(!article) 
            throw new Error('Article not found!');
    
        return {
            props: {
                article,
                isAuth: (session && session?.jwt && session?.user),
            },
        };
    } catch(err) {
        return {
            redirect: {
                permanent: true,
                destination: '/404',
            },
        }
    }
}

export default ArticleDetailsPage;