import { getArticleErrorSelector, getArticleLoaderSelector } from '@/store/selectors/article';
import { Container, Display, Image, Info, LoaderContainer, Row } from '@/styles/components/editor';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import EditorPages from './pages';
import { validPostArticle } from '@/utility/article';
import { UserDoc } from '../../../types/next-auth';

type EditorProps = {
    onButtonClick?: Function | undefined;
    user: UserDoc,
}

const Editor = ({ onButtonClick, user }: EditorProps) => {    
    const loader = useSelector(getArticleLoaderSelector);
    const error = useSelector(getArticleErrorSelector);

    const [domLoaded, setDomLoaded] = useState(false);
    
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<any>(null);
    const [image, setImage] = useState<string>('');
    const [file, setFile] = useState<any>(null);

    const valid = validPostArticle({ title, content, image, file, author: 'test author' });

    useEffect(() => {
        setDomLoaded(true);
        document.body.style.overflow = "hidden";
        
        return () => {
            document.body.style.overflow = "scroll"
        };
    }, []);

    useEffect(() => {
        if(error) {
            console.log(`[Article Post failed]: ${error}`);
        }
    }, [error]);

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);
        formData.append('file', file);
        formData.append('author', user?.id);
        onButtonClick?.(formData);
    }

    if(!domLoaded) {
        return (
            <Container>
                <LoaderContainer>
                    <Spinner style={{ height: 30, width: 30, color: '#1894ff' }} />
                </LoaderContainer>
            </Container>
        );
    }

    return (
        <Container>
            <Row>
                <Display>
                    {(image || file) && <Image 
                        src={image || URL.createObjectURL(file)}
                        alt={title}
                    />}
                </Display>
                <Info>
                    <EditorPages 
                        title={title}
                        content={content}
                        image={image}
                        file={file}
                        error={error}
                        loader={loader}
                        valid={valid}
                        setTitle={setTitle}
                        setContent={setContent}
                        setImage={setImage}
                        setFile={setFile}
                        onSubmit={onSubmit}
                    />
                </Info>
            </Row>
        </Container>
    );
}

export default Editor;