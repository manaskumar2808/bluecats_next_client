import { Author, Container, Display, Image, Content, Title, ShareContainer, Row } from "@/styles/components/article";
import { ArticleType } from "@/types/article";
import { getAspectRatio } from "@/utility/image";
import { ImageLoaderProps } from "next/image";
import { useEffect, useState } from "react";
import { FacebookShareButton, WhatsappShareButton, WhatsappIcon, PinterestShareButton, EmailShareButton, LinkedinShareButton, LinkedinIcon, PinterestIcon, FacebookIcon, InstapaperShareButton, InstagramIcon, EmailIcon } from 'next-share';
import Photo from "../photo";

type ArticleProps = {
    article: ArticleType;
    url: string;
}

const Article = ({ article, url }: ArticleProps) => {
    const { title, content, image, author } = article;

    const [aspectRatio, setAspectRatio] = useState<number>(0.0);

    const iconSize = 32;

    useEffect(() => {
        if(!image)
            return;
        getAspectRatio(image).then(ar => {
            setAspectRatio(ar);
        }).catch(err => {
            console.log('Error loading image', err?.message);
        });
    }, [image]);

    return (
        <Container>
            {image && aspectRatio > 0.0 && <Display aspectRatio={aspectRatio}>
                {/* <Image loader={(img: ImageLoaderProps) => img.src} src={image} alt={title} layout='fill' objectFit="cover" /> */}
                <Photo src={image} alt={title} fill />
            </Display>}
           <Title>{title}</Title>
           <Author>{author?.userName}</Author>
           <Content>
                <div className="content" dangerouslySetInnerHTML={{__html: content}} />
           </Content>
           <ShareContainer>
                <Row>
                    <FacebookShareButton title={title} url={url}>
                        <FacebookIcon size={iconSize} round />
                    </FacebookShareButton>
                    <WhatsappShareButton title={title} url={url} separator=":">
                        <WhatsappIcon size={iconSize} round />
                    </WhatsappShareButton>
                    <LinkedinShareButton title={title} url={url}>
                        <LinkedinIcon size={iconSize} round />
                    </LinkedinShareButton>
                    <PinterestShareButton title={title} url={url} media={image as string}>
                        <PinterestIcon size={iconSize} round />
                    </PinterestShareButton>
                    <InstapaperShareButton title={title} url={url}>
                        <InstagramIcon size={iconSize} round />
                    </InstapaperShareButton>
                    <EmailShareButton title={title} url={url}>
                        <EmailIcon size={iconSize} round />
                    </EmailShareButton>
                </Row>
           </ShareContainer>
        </Container>
    );
}

export default Article;