import { Container, Grid, Col, Legend } from '@/styles/components/listing/article';
import ArticleCard from '../article/card';
import { ArticleListingType } from '@/constants/article';

interface ArticleListingProps {
    list: any[];
    legend?: string;
    type?: ArticleListingType;
};

const ArticleListing = ({ list = [], legend, type }: ArticleListingProps) => {

    const articleList = list?.map((item) => (
        <ArticleCard key={item?.id} article={item} />
    ));

    return (
        <Container>
            {legend && <Legend>{legend}</Legend>}
            {type === ArticleListingType.COLUMN ? <Col>{articleList}</Col> : <Grid>{articleList}</Grid>}
        </Container>
    );
}

export default ArticleListing;