import { ArticleMode } from '@/constants/article';
import { RouteEnum } from '@/constants/route';
import { Container, Column, Author, Display, Photo, Title } from '@/styles/components/article/card';
import { ArticleType } from '@/types/article';
import { ImageLoaderProps } from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';

interface ArticleCardProps {
    article: ArticleType;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
    const router = useRouter();
    const { id, title, author, image, mode } = article;

    const onArticleClick = () => {
        if(mode === ArticleMode.DRAFT)
            router.push(`post?id=${id}`);
        else
            router.push(`articles/${title}`);
    }

    const goToAuthorProfile = (e: any) => {
        e?.stopPropagation();
        router?.push(`${RouteEnum.PROFILE}?username=${author?.userName}`);
    }

    return (
        <Container onClick={onArticleClick}>
            <Column>
                <Display>
                    {image && <Photo loader={(img: ImageLoaderProps) => img.src} src={image} alt={title} layout='fill' />}
                </Display>
                <Title>{title}</Title>
                <Author id='author' onClick={goToAuthorProfile}>{author?.userName}</Author>
            </Column>
        </Container>
    );
};

export default ArticleCard;