import { Container, InputContainer } from '@/styles/components/editor/segment/media';
import Uploader from '@/components/uploader';
import { MediaType } from '@/constants/media';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { MediaPayload, SegmentObj, SegmentType } from '@/constants/segment';
import { getModifiedImageURL } from '@/utility/image';

interface MediaSegmentProps {
    segment: SegmentObj;
    onSegmentSave: Function;
}

const MediaSegment = ({ segment, onSegmentSave }: MediaSegmentProps) => {
    const { url: defaultUrl, caption: defaultCaption, cdn: defaultCdn } = segment?.payload as MediaPayload;

    const [url, setUrl] = useState<string>(defaultUrl || '');
    const [caption, setCaption] = useState<string>(defaultCaption || '');
    const [file, setFile] = useState<any>();

    const onMediaSegmentSave = async () => {
        const formData = new FormData();
        if(segment?.id)
            formData.append('id', segment?.id);
        formData.append('url', url);
        formData.append('caption', caption);
        formData.append('file', file);
        formData.append('mediaType', MediaType.IMAGE);
        formData.append('type', SegmentType.MEDIA);
        await onSegmentSave(formData);
    }

    return (
        <Container>
            <Uploader 
                url={getModifiedImageURL(url, defaultCdn)}
                setUrl={setUrl}
                file={file}
                setFile={setFile}
            />
            <InputContainer>
                <Form.Control 
                    value={caption}
                    onChange={e => setCaption(e?.target?.value)}
                    placeholder='Media caption'
                />
            </InputContainer>
            <Button type='button' onClick={onMediaSegmentSave}>Save</Button>
        </Container>
    );
}

export default MediaSegment;