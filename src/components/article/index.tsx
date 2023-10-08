import { Author, Container, Display, Image, Content, Title } from "@/styles/components/article";
import { ArticleType } from "@/types/article";
import { getAspectRatio } from "@/utility/image";
import { ImageLoaderProps } from "next/image";
import { useEffect, useState } from "react";

type ArticleProps = {
    article: ArticleType;
}

const Article = ({ article }: ArticleProps) => {
    const { title, content, image, author } = article;

    const [aspectRatio, setAspectRatio] = useState<number>(0.0);

    useEffect(() => {
        if(!image)
            return;
        getAspectRatio(image).then(ar => {
            setAspectRatio(ar);
        }).catch(err => {
            console.log('Error loading image', err?.message);
        });
    }, []);

    return (
        <Container>
            {image && aspectRatio > 0.0 && <Display aspectRatio={aspectRatio}>
                <Image loader={(img: ImageLoaderProps) => img.src} src={image} alt={title} layout='fill' objectFit="cover" />
            </Display>}
           <Title>{title}</Title>
           <Author>{author?.userName}</Author>
           <Content>
                <div className="content" dangerouslySetInnerHTML={{__html: content}} />
           </Content>
        </Container>
    );
}

export default Article;