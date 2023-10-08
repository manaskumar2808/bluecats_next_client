import { MouseEventHandler, useState } from "react";
import BasicInput from "./basic";
import QuillInput from "./quill";
import { Container, ButtonContainer, Error, ButtonWrapper } from '@/styles/components/editor/pages';
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
    loader: boolean | undefined;
    error: string | undefined | null;
    valid: boolean | undefined;
    onSubmit: MouseEventHandler<HTMLButtonElement> | undefined;
};

const EditorPages = ({ title, setTitle, image, setImage, file, setFile, content, setContent, error, loader, valid, onSubmit }: EditorPagesProps) => {
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
            {pages[page]}
            <div style={{ flex: 1 }} />
            {error && error?.length > 0 && <Error>{error}</Error>}
            <ButtonContainer>
                <ButtonWrapper>
                    <Button style={{ width: '100%' }} variant='dark' disabled={page === 0} onClick={prevPage}>Previous</Button>
                </ButtonWrapper>
                {page !== length-1 && <ButtonWrapper><Button style={{ width: '100%' }} variant='dark' disabled={page === length-1} onClick={nextPage}>Next</Button></ButtonWrapper>}
                {page === length-1 && <ButtonWrapper><Button style={{ width: '100%' }} onClick={onSubmit} disabled={!valid}>{loader ? <Spinner color="#fff" size='sm' /> : 'Post Article'}</Button></ButtonWrapper>}
            </ButtonContainer>
        </Container>
    );
}

export default EditorPages;