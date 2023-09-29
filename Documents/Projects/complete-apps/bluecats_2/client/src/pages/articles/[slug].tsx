import Article from '@/components/article';
import { Container } from '@/styles/pages/articles/details';
import { ArticleType } from '@/types/article';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const title = context.params?.['slug'] as string;
    const encodedTitle = title && encodeURIComponent(title);
    const res = await axios.get(`http://localhost:2000/api/article/${encodedTitle}`);
    const article = res?.data?.payload?.article || [];

    return {
        props: {
            article,
        },
    };
}

export default ArticleDetailsPage;