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
        </Container>
    );
}

export default BasicInput;