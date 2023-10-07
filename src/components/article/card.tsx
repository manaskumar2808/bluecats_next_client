import { Container, Column, Author, Display, Photo, Title } from '@/styles/components/article/card';
import { ArticleType } from '@/types/article';
import { ImageLoaderProps } from 'next/image';
import { useRouter } from 'next/navigation';

interface ArticleCardProps {
    article: ArticleType;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
    const router = useRouter();
    const { title, author, image } = article;

    const onArticleClick = () => {
        router.push(`articles/${title}`);
    }

    return (
        <Container onClick={onArticleClick}>
            <Column>
                <Display>
                    {image && <Photo loader={(img: ImageLoaderProps) => img.src} src={image} alt={title} layout='fill' />}
                </Display>
                <Title>{title}</Title>
                <Author>{author?.userName}</Author>
            </Column>
        </Container>
    );
};

export default ArticleCard;