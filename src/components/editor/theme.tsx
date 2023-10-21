import { useRef } from "react";
import { Container, Display, Image, Row, Col, PlaceholderContainer, PlaceholderText } from '@/styles/components/editor/theme';
import { Button, Form } from "react-bootstrap";

interface ThemeInputProps {
    image: string;
    setImage: Function;
    file: any;
    setFile: Function;
};


const ThemeInput = ({ image, file, setImage, setFile }: ThemeInputProps) => {
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
                    {(image || file) ? <Image 
                        src={image || URL.createObjectURL(file)}
                        alt={'theme image'}
                    /> : <PlaceholderContainer>
                        <PlaceholderText>Cover Image</PlaceholderText>
                    </PlaceholderContainer>}
                </Display>
                <Row>
                    <Form.Group>
                            {/* <Form.Label>Image URL</Form.Label> */}
                            <Form.Control 
                                value={image}
                                onChange={e => setImage(e?.target?.value)}
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

export default ThemeInput;