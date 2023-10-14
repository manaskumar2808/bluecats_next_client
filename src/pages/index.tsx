import { Container, Error, FallbackContainer } from "@/styles/pages";
import { ArticleType } from "@/types/article";
import { GetServerSidePropsContext } from "next";
import { store, wrapper } from '@/store';
import { updateArticles } from "@/store/slices/article";
import { useSelector } from "react-redux";
import { getArticleErrorSelector, getArticleLoaderSelector, getArticleSelector } from "@/store/selectors/article";
import ArticleListing from "@/components/listing/article";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import getConfig from 'next/config';
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { NextSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from "../../next-seo-config";

const { publicRuntimeConfig: config } = getConfig();

interface HomePageProps {
    articles: ArticleType[];
};

const HomePage = ({ articles: articleList }: HomePageProps) => {
    const loader = useSelector(getArticleLoaderSelector);
    const error = useSelector(getArticleErrorSelector);

    if(loader) {
        return (
            <FallbackContainer>
                <Spinner style={{ height: 30, width: 30, color: '#1894ff' }} />
            </FallbackContainer>
        );
    }

    if(error) {
        return (
            <FallbackContainer>
                <Error>Cannot get articles at the moment.</Error>
            </FallbackContainer>
        );
    }

    return (
        <Container>
            <NextSeo 
                {...NEXT_SEO_DEFAULT}
            />
            <ArticleListing list={articleList} />
        </Container>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context?.req, context?.res, authOptions);

    const res = await axios.get(`${config?.BASE_URL}/${config?.ARTICLE}`);
    const articles = res?.data?.payload?.articles || [];
    store.dispatch(updateArticles({ articles }));

    return {
        props: {
            articles,
            isAuth: (session && session?.jwt && session?.user),
        },
    };
}

export default HomePage;