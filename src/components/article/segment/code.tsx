import CodeEditor from '@/components/code-editor';
import { CodePayload, SegmentObj } from '@/constants/segment';
import { Container } from '@/styles/components/article/segment/code';

interface ArticleCodeSegmentProps {
    segment: SegmentObj;
};

const ArticleCodeSegment = ({ segment }: ArticleCodeSegmentProps) => {
    const payload = segment?.payload as CodePayload;

    return (
        <Container>
            <CodeEditor 
                code={payload?.code || ''}
                language={payload?.language || 'javascript'}
                theme={payload?.theme || 'light'}
                readOnly
            />
        </Container>
    );
}

export default ArticleCodeSegment;