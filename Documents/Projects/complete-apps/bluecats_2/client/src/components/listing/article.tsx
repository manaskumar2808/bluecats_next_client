import { Container, Grid } from '@/styles/components/listing/article';
import { ArticleType } from '@/types/article';
import ArticleCard from '../article/card';
import { useEffect, useState } from 'react';

interface ArticleListingProps {
    list: any[];
};

const ArticleListing = ({ list = [] }: ArticleListingProps) => {
    return (
        <Container>
            <Grid>
                {list?.map((item) => (
                    <ArticleCard key={item?.id} article={item} />
                ))}
            </Grid>
        </Container>
    );
}

export default ArticleListing;