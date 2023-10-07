import { Author, Container, Display, Image, Content, Title } from "@/styles/components/article";
import { ArticleType } from "@/types/article";
import { ImageLoaderProps } from "next/image";

type ArticleProps = {
    article: ArticleType;
}

const Article = ({ article }: ArticleProps) => {
    const { title, content, image, author } = article;

    return (
        <Container>
            <Display>
                {image && <Image loader={(img: ImageLoaderProps) => img.src} src={image} alt={title} layout={'fill'} objectFit="contain" style={{ borderRadius: 10 }} />}
            </Display>
           <Title>{title}</Title>
           <Author>{author?.userName}</Author>
           <Content dangerouslySetInnerHTML={{__html: content}} />
        </Container>
    );
}

export default Article;