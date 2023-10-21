import { MouseEventHandler, useState } from "react";
import BasicInput from "./basic";
import QuillInput from "./quill";
import { Container, Error, SaveContainer } from '@/styles/components/editor/pages';
import { Button, Spinner } from "react-bootstrap";

interface EditorPagesProps {
    title: string;
    setTitle: Function;
    image: string;
    setImage: Function;
    file: any;
    setFile: Function;
    content: string;
    setContent: Function;
    saving?: boolean;
    deleting?: boolean;
    loader: boolean | undefined;
    error: string | undefined | null;
    valid?: boolean;
    validDraft?: boolean;
    onSubmit?: MouseEventHandler<HTMLButtonElement>;
    onSave?: MouseEventHandler<HTMLButtonElement>;
    onDelete?: MouseEventHandler<HTMLButtonElement>;
};

const EditorPages = ({ title, setTitle, image, setImage, file, setFile, content, setContent, error, loader, saving, deleting, valid, validDraft, onSubmit, onSave, onDelete }: EditorPagesProps) => {
    const [page, setPage] = useState(0);

    const pages = [
        <BasicInput key={'basic'} title={title} image={image} setTitle={setTitle} setImage={setImage} file={file} setFile={setFile}  />,
        <QuillInput key={'quill'} content={content} setContent={setContent} />
    ];

    const length = pages?.length;

    const nextPage = () => {
        setPage(prev => {
            if(prev === length-1)
                return prev;
            return prev+1;
        });
    }

    const prevPage = () => {
        setPage(prev => {
            if(prev === 0)
                return prev;
            return prev-1;
        });
    }

    return (
        <Container>
            <SaveContainer>
                <Button style={{ width: 100 }} size='sm' variant='primary' disabled={saving || !validDraft} onClick={onSave}>{saving ? 'Saving...' : 'Save'}</Button>
                <Button style={{ width: 100 }} size='sm' variant='danger' disabled={deleting || !validDraft} onClick={onDelete}>{deleting ? 'Deleting...' : 'Delete'}</Button>
            </SaveContainer>
            <BasicInput 
                key={'basic'} 
                title={title} 
                image={image} 
                file={file} 
                setTitle={setTitle} 
                setImage={setImage} 
                setFile={setFile}  
            />
            <QuillInput 
                key={'quill'} 
                content={content} 
                setContent={setContent} 
            />
            <div style={{ flex: 1 }} />
            {error && error?.length > 0 && <Error>{error}</Error>}
            <Button style={{ width: 200, margin: 'auto' }} onClick={onSubmit} disabled={!valid}>{loader ? <Spinner color="#fff" size='sm' /> : 'Post Article'}</Button>
        </Container>
    );
}

export default EditorPages;