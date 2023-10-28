import { MediaPayload, SegmentObj } from '@/constants/segment';
import { Container, Display, Caption, Image } from '@/styles/components/article/segment/media';
import { getAspectRatio, getModifiedImageURL } from '@/utility/image';
import { useEffect, useState } from 'react';

interface ArticleMediaSegmentProps {
    segment: SegmentObj;
}

const ArticleMediaSegment = ({ segment }: ArticleMediaSegmentProps) => {
    const [aspectRatio, setAspectRatio] = useState<number>(0.0);

    const { url, caption, cdn } = (segment?.payload as MediaPayload);

    useEffect(() => {
        if(!url)
            return;
        getAspectRatio(url).then(ar => {
            setAspectRatio(ar);
        }).catch(err => {
            console.log('Error loading image', err?.message);
        });
    }, [url]);

    return (
        <Container>
            {url && 
                <Display>
                    <Image src={getModifiedImageURL(url, cdn)} alt={caption ?? ''} fill unoptimized />
                </Display>
            }
            {caption && <Caption>{caption}</Caption>}
        </Container>
    );
}

export default ArticleMediaSegment;