import { getArticleErrorSelector, getArticleLoaderSelector } from '@/store/selectors/article';
import { Container, Display, Image, Info, LoaderContainer, Row } from '@/styles/components/editor';
import { useCallback, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import EditorPages from './pages';
import { validDraftArticle, validPostArticle } from '@/utility/article';
import { UserDoc } from '../../../types/next-auth';
import { ArticleType } from '@/types/article';

type EditorProps = {
    user: UserDoc,
    article?: ArticleType,
    onButtonClick?: Function;
    onDraftSave?: Function;
    onDraftDelete?: Function;
}

const Editor = ({ article, user, onButtonClick, onDraftSave, onDraftDelete }: EditorProps) => { 
    const loader = useSelector(getArticleLoaderSelector);
    const error = useSelector(getArticleErrorSelector);

    const [domLoaded, setDomLoaded] = useState(false);
    const [saving, setSaving] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);
    
    const [id, setId] = useState<string | undefined>(article?.id);
    const [title, setTitle] = useState<string>(article?.title || '');
    const [content, setContent] = useState<any>(article?.content || '');
    const [image, setImage] = useState<string>(article?.image || '');
    const [file, setFile] = useState<any>(null);

    const valid = validPostArticle({ title, content, image, file });

    useEffect(() => {
        setDomLoaded(true);
        document.body.style.overflow = "hidden";
        
        return () => {
            document.body.style.overflow = "scroll"
        };
    }, []);

    useEffect(() => {
        onSave();
    }, [title, content, image, file]);

    useEffect(() => {
        if(error) {
            console.log(`[Article Post failed]: ${error}`);
        }
    }, [error]);

    const onDelete = async () => {
        try {
            if(!id)
                return;
            setDeleting(true);
            await onDraftDelete?.(id);
            setDeleting(false);
        } catch(err) {
            setDeleting(false);
        }
    }

    const onSave = useCallback(async () => {
        try {
            if(!validDraftArticle({ id, title, content, file, image }))
                return;
            setSaving(true);
            const formData = new FormData();
            if(id)
                formData.append('id', id);
            formData.append('title', title);
            formData.append('content', content);
            formData.append('image', image);
            formData.append('file', file);
            formData.append('author', user?.id);
            const result = await onDraftSave?.(formData);
            if(!id)
                setId(result?.payload?.draft?.id);
            setSaving(false);
        } catch(err) {
            console.log('saving err', err);
            setSaving(false);
        }
    }, [id, title, content, image, file]);

    const onSubmit = () => {
        const formData = new FormData();
        if(id)
            formData.append('id', id);
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
                        saving={saving}
                        deleting={deleting}
                        error={error}
                        loader={loader}
                        valid={valid}
                        setTitle={setTitle}
                        setContent={setContent}
                        setImage={setImage}
                        setFile={setFile}
                        onSave={onSave}
                        onSubmit={onSubmit}
                        onDelete={onDelete}
                    />
                </Info>
            </Row>
        </Container>
    );
}

export default Editor;