import { SegmentObj, TextPayload } from '@/constants/segment';
import { Container } from '@/styles/components/article/segment/text';

interface ArticleTextSegmentProps {
    segment: SegmentObj;
};

const ArticleTextSegment = ({ segment }: ArticleTextSegmentProps) => {
    return (
        <Container>
            <div className="content" dangerouslySetInnerHTML={{__html: (segment?.payload as TextPayload)?.text}} />
        </Container>
    );
}

export default ArticleTextSegment;