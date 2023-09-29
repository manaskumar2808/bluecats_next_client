import { Container, Text, Upload } from "@/styles/components/editor/pages/basic";
import { RefObject, useRef } from "react";
import { Button, Form } from 'react-bootstrap';

interface BasicInputProps {
    title: string;
    setTitle: Function;
    image: string;
    setImage: Function;
    file: any;
    setFile: Function;
};

const BasicInput = ({ title, image, setTitle, setImage, file, setFile }: BasicInputProps) => {
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
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    value={title}
                    onChange={e => setTitle(e?.target?.value)}
                    placeholder='Title for the article'
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Image URL</Form.Label>
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
            <Upload>
                <Text>or</Text>
                <Button onClick={uploadClickHandler}>Upload</Button>
            </Upload>
        </Container>
    );
}

export default BasicInput;