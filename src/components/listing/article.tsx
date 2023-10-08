import { Container, Grid, Legend } from '@/styles/components/listing/article';
import ArticleCard from '../article/card';

interface ArticleListingProps {
    list: any[];
    legend?: string;
};

const ArticleListing = ({ list = [], legend }: ArticleListingProps) => {
    return (
        <Container>
            {legend && <Legend>{legend}</Legend>}
            <Grid>
                {list?.map((item) => (
                    <ArticleCard key={item?.id} article={item} />
                ))}
            </Grid>
        </Container>
    );
}

export default ArticleListing;