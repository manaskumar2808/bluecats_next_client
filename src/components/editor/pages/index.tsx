import { MouseEventHandler, useState } from "react";
import BasicInput from "./basic";
import { Container, Error, SaveContainer, SegmentContainer } from '@/styles/components/editor/pages';
import { Button, Spinner } from "react-bootstrap";
import SegmentSelector from "../segment-selector";
import { SegmentObj, SegmentType } from "@/constants/segment";
import axios from "axios";
import { publicRuntimeConfig as config } from '../../../../next.config';
import headerConfig from "@/utility/request";
import { useSession } from "next-auth/react";
import Segment from "../segment";

interface EditorPagesProps {
    title: string;
    setTitle: Function;
    image: string;
    setImage: Function;
    file: any;
    setFile: Function;
    segments: SegmentObj[];
    setSegments: Function;
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

const EditorPages = ({ title, setTitle, image, setImage, file, setFile, segments, setSegments, error, loader, saving, deleting, valid, validDraft, onSubmit, onSave, onDelete }: EditorPagesProps) => {

    const { data: session } = useSession();

    const onAddSegment = async (type: SegmentType) => {
        try {
            const formData = new FormData();
            formData.append('type', type);
            const response = await axios.post(`${config?.BASE_URL}/${config?.SEGMENT}`, formData, headerConfig(session?.jwt?.token as string));
            if(response?.data?.error) 
                throw new (Error as any)(response?.data?.error ?? 'Adding segment failed!');
            const segment: SegmentObj = response?.data?.payload?.segment;
            setSegments((prevSegments: SegmentObj[]) => [...prevSegments, segment]);
        } catch(err) {
            console.log(err);
        }
    }
    
    const onSegmentSave = async (payload: FormData) => {
        try {
            const response = await axios.post(`${config?.BASE_URL}/${config?.SEGMENT}`, payload, headerConfig(session?.jwt?.token as string));
            if(response?.data?.error) 
                throw new (Error as any)(response?.data?.error ?? 'Saving segment failed!');
        } catch(err) {
            console.log(err);
        }
    }

    const onSegmentDelete = async (segmentId: string) => {
        try {
            const response = await axios.delete(`${config?.BASE_URL}/${config?.SEGMENT}/${segmentId}`, headerConfig(session?.jwt?.token as string));
            if(response?.data?.error) 
                throw new (Error as any)(response?.data?.error ?? 'Deleting segment failed!');
            setSegments((prevSegments: SegmentObj[]) => {
                const segmentList = [...prevSegments];
                const updatedSegmentList = segmentList?.filter(segment => segment?.id !== segmentId);
                return updatedSegmentList;
            });
        } catch(err) {
            console.log(err);
        }
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
            <SegmentContainer>
                {segments.map(segment => <Segment key={segment?.id} segment={segment} onSegmentSave={onSegmentSave} onSegmentDelete={onSegmentDelete} />)}
            </SegmentContainer>
            <SegmentSelector onAddSegment={onAddSegment} />
            <div style={{ flex: 1 }} />
            {error && error?.length > 0 && <Error>{error}</Error>}
            <Button style={{ width: 200, margin: 'auto' }} onClick={onSubmit} disabled={!valid}>{loader ? <Spinner color="#fff" size='sm' /> : 'Post Article'}</Button>
        </Container>
    );
}

export default EditorPages;