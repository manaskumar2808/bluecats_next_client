import QuillInput from '@/components/quill';
import { SegmentObj, SegmentType, TextPayload } from '@/constants/segment';
import { Container } from '@/styles/components/editor/segment/text';
import { useCallback, useEffect, useState } from 'react';

interface TextSegmentProps {
    segment: SegmentObj;
    onSegmentSave: Function;
}

const TextSegment = ({ segment, onSegmentSave }: TextSegmentProps) => {
    const [content, setContent] = useState((segment?.payload as TextPayload)?.text || '');

    useEffect(() => {
        onTextSegmentSave();
    }, [content]);

    const onTextSegmentSave = useCallback(async () => {
        if(!content || content?.trim?.()?.length === 0)
            return;
        const formData = new FormData();
        if(segment?.id)
            formData.append('id', segment?.id);
        formData.append('text', content);
        formData.append('type', SegmentType.TEXT);
        await onSegmentSave(formData);
    }, [content]);

    return (
        <Container>
            <QuillInput 
                content={content} 
                setContent={setContent} 
            />
        </Container>
    );
}

export default TextSegment;