import { Container, Col, Display, Image, PlaceholderContainer, PlaceholderText, Row } from '@/styles/components/uploader';
import { useRef } from "react";
import { Button, Form } from 'react-bootstrap';

interface UploaderProps {
    url: string;
    setUrl: Function;
    file: any;
    setFile: Function;
};

const Uploader = ({ url, file, setUrl, setFile }: UploaderProps) => {
    const fileInput = useRef<HTMLInputElement>(null);

    const uploadClickHandler = () => {
        fileInput?.current?.click();
    }

    const onUpload = (files: FileList | null) => {
        if(!files)
            return;
        const file = files?.[0];
        console.log('file', file);
        setFile(file);
    }

    return (
        <Container>
            <Col>
                <Display>
                    {(url || file) ? <Image 
                        src={url || URL.createObjectURL(file)}
                        alt={'theme image'}
                    /> : <PlaceholderContainer>
                        <PlaceholderText>Upload Image</PlaceholderText>
                    </PlaceholderContainer>}
                </Display>
                <Row>
                    <Form.Group>
                            {/* <Form.Label>Image URL</Form.Label> */}
                            <Form.Control 
                                value={url}
                                onChange={e => setUrl(e?.target?.value)}
                                placeholder='Image URL for theme'
                            />
                    </Form.Group>
                    <Form.Group style={{ display: 'none' }}>
                        <Form.Control 
                            id="upload"
                            ref={fileInput}
                            onChange={e => onUpload((e?.target as HTMLInputElement).files)}
                            placeholder='Image URL for theme'
                            type="file"
                        />
                    </Form.Group>
                    <Button size='sm' onClick={uploadClickHandler}>Upload</Button>
                </Row>
            </Col>
        </Container>
    );
}

export default Uploader;