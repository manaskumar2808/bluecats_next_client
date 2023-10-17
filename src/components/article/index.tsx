import { Author, Container, Display, Image, Content, Title, ShareContainer, Row, Header, HeaderItem, Timestamp } from "@/styles/components/article";
import { ArticleType } from "@/types/article";
import { getAspectRatio } from "@/utility/image";
import { useEffect, useState } from "react";
import { FacebookShareButton, WhatsappShareButton, WhatsappIcon, PinterestShareButton, EmailShareButton, LinkedinShareButton, LinkedinIcon, PinterestIcon, FacebookIcon, InstapaperShareButton, InstagramIcon, EmailIcon } from 'next-share';
import Photo from "../photo";
import { useRouter } from "next/router";
import { RouteEnum } from "@/constants/route";
import Profile from "../profile";
import { getDisplayTimestamp } from "@/utility/timestamp";

type ArticleProps = {
    article: ArticleType;
    url: string;
}

const Article = ({ article, url }: ArticleProps) => {
    const router = useRouter();

    const { title, content, image, author, createdAt } = article;

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

    const goToAuthorProfile = () => {
        router?.push(`${RouteEnum.PROFILE}?username=${author?.userName}`);
    }

    return (
        <Container>
            <Header>
                <Row>
                    <Profile user={author} radius={20} border />
                    <HeaderItem>
                        <Author onClick={goToAuthorProfile}>{author?.userName}</Author>
                        <Timestamp>{getDisplayTimestamp(createdAt as string)}</Timestamp>
                    </HeaderItem>
                </Row>
            </Header>
            <Title>{title}</Title>
            {image && aspectRatio > 0.0 && <Display aspectRatio={aspectRatio}>
                <Photo src={image} alt={title} fill />
            </Display>}
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