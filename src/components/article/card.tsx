import { ArticleMode } from '@/constants/article';
import { RouteEnum } from '@/constants/route';
import { Container, Column, Row, Header, Author, Display, Photo, Title, Content, Timestamp, HeaderItem, ReadMore } from '@/styles/components/article/card';
import { ArticleType } from '@/types/article';
import { ImageLoaderProps } from 'next/image';
import { useRouter } from 'next/navigation';
import Profile from '../profile';
import { getDisplayTimestamp } from '@/utility/timestamp';
import { decompressContent } from '@/utility/article';
import { SegmentType, TextPayload } from '@/constants/segment';

interface ArticleCardProps {
    article: ArticleType;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
    const router = useRouter();
    const { id, title, content: compressedContent, segments, author, image, mode, createdAt } = article;
    const content = decompressContent(compressedContent);

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

    const firstTextSegment = segments?.filter(segment => segment?.type === SegmentType.TEXT)?.[0];

    return (
        <Container onClick={onArticleClick}>
            <Column>
                <Header>
                    <Row>
                        <Profile user={author} radius={17} border />
                        <HeaderItem>
                            <Author id='author' onClick={goToAuthorProfile}>{author?.userName}</Author>
                            <Timestamp>{getDisplayTimestamp(createdAt as string)}</Timestamp>
                        </HeaderItem>
                    </Row>
                </Header>
                <Display>
                    {image && <Photo loader={(img: ImageLoaderProps) => img.src} unoptimized src={image} alt={title} fill />}
                </Display>
                <Title>{title}</Title>
                <Content>
                    <div className="content" dangerouslySetInnerHTML={{__html: (firstTextSegment?.payload as TextPayload)?.text || content}} />
                </Content>
                <ReadMore onClick={onArticleClick}>Read more</ReadMore>
            </Column>
        </Container>
    );
};

export default ArticleCard;