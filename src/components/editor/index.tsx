import { getArticleErrorSelector, getArticleLoaderSelector } from '@/store/selectors/article';
import { Container, Display, Image, Info, LoaderContainer, Row, Col } from '@/styles/components/editor';
import { useCallback, useEffect, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import EditorPages from './pages';
import { compressContent, decompressContent, validDraftArticle, validPostArticle } from '@/utility/article';
import { UserDoc } from '../../../types/next-auth';
import { ArticleType } from '@/types/article';
import ThemeInput from './theme';
import pako from 'pako';
import { SegmentObj } from '@/constants/segment';

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
    const [image, setImage] = useState<string>(article?.image || '');
    const [segments, setSegments] = useState<SegmentObj[]>(article?.segments || []);
    const [file, setFile] = useState<any>(null);
    const segmentIds: string[] = segments.map(segment => segment.id); 

    const valid = validPostArticle({ title, segments, image, file });
    const validDraft = validDraftArticle({ id, title, segments, image, file });

    useEffect(() => {
        setDomLoaded(true);
        document.body.style.overflow = "hidden";
        
        return () => {
            document.body.style.overflow = "scroll"
        };
    }, []);

    useEffect(() => {
        onSave();
    }, [title, segmentIds?.length, image, file]);

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
            if(!validDraftArticle({ id, title, segments, file, image }))
                return;
            setSaving(true);
            const formData = new FormData();
            if(id)
                formData.append('id', id);
            formData.append('title', title);
            formData.append('segments', JSON.stringify(segmentIds));
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
    }, [id, title, segmentIds?.length, image, file]);

    const onSubmit = () => {
        const formData = new FormData();
        if(id)
            formData.append('id', id);
        formData.append('title', title);
        formData.append('segments', JSON.stringify(segmentIds));
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
            <Col>
                <ThemeInput 
                    image={image}
                    file={file}
                    setImage={setImage}
                    setFile={setFile}
                />
                <EditorPages 
                    title={title}
                    segments={segments}
                    image={image}
                    file={file}
                    saving={saving}
                    deleting={deleting}
                    error={error}
                    loader={loader}
                    valid={valid}
                    validDraft={validDraft}
                    setTitle={setTitle}
                    setSegments={setSegments}
                    setImage={setImage}
                    setFile={setFile}
                    onSave={onSave}
                    onSubmit={onSubmit}
                    onDelete={onDelete}
                />
            </Col>
        </Container>
    );
}

export default Editor;