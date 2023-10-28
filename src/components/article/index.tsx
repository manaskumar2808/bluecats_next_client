import { Author, Container, Display, SegmentSection, Content, Title, ShareContainer, Row, Header, HeaderItem, Timestamp } from "@/styles/components/article";
import { ArticleType } from "@/types/article";
import { getAspectRatio } from "@/utility/image";
import { useEffect, useState } from "react";
import { FacebookShareButton, WhatsappShareButton, PinterestShareButton, EmailShareButton, LinkedinShareButton, InstapaperShareButton } from 'next-share';
import FacebookIcon from '@/icons/facebook';
import WhatsappIcon from "@/icons/whatsapp";
import LinkedInIcon from "@/icons/linkedin";
import PintrestIcon from "@/icons/pintrest";
import InstagramIcon from "@/icons/instagram";
import Photo from "../photo";
import { useRouter } from "next/router";
import { RouteEnum } from "@/constants/route";
import Profile from "../profile";
import { getDisplayTimestamp } from "@/utility/timestamp";
import { decompressContent } from "@/utility/article";
import ArticleSegment from "./segment";

type ArticleProps = {
    article: ArticleType;
    url: string;
}

const Article = ({ article, url }: ArticleProps) => {
    const router = useRouter();

    const { title, content: compressedContent, image, segments, author, createdAt } = article;

    const content = decompressContent(compressedContent);

    const [aspectRatio, setAspectRatio] = useState<number>(0.0);

    const iconSize = 24;

    useEffect(() => {
        console.log('article', article);
    }, [article]);

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
            {image && aspectRatio > 0.0 && <Display aspectratio={aspectRatio}>
                <Photo src={image} alt={title} fill unoptimized />
            </Display>}
           {content && <Content>
                <div className="content" dangerouslySetInnerHTML={{__html: content}} />
           </Content>}
           <SegmentSection>
                {segments.map(segment => <ArticleSegment segment={segment} />)}
           </SegmentSection>
           <ShareContainer>
                <Row>
                    <FacebookShareButton title={title} url={url}>
                        <FacebookIcon size={iconSize} />
                    </FacebookShareButton>
                    <WhatsappShareButton title={title} url={url} separator=":">
                        <WhatsappIcon size={iconSize} />
                    </WhatsappShareButton>
                    <LinkedinShareButton title={title} url={url}>
                        <LinkedInIcon size={iconSize} />
                    </LinkedinShareButton>
                    <PinterestShareButton title={title} url={url} media={image as string}>
                        <PintrestIcon size={iconSize} />
                    </PinterestShareButton>
                    <InstapaperShareButton title={title} url={url}>
                        <InstagramIcon size={iconSize} />
                    </InstapaperShareButton>
                </Row>
           </ShareContainer>
        </Container>
    );
}

export default Article;