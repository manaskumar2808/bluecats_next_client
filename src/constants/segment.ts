import { MediaType } from "./media";

export enum SegmentType {
    TEXT = 'TEXT',
    CODE = 'CODE',
    MEDIA = 'MEDIA',
};  

export interface SegmentObj {
    id: string;
    type: SegmentType;
    payload: TextPayload | CodePayload | MediaPayload;
}

export interface CodePayload {
    code: string;
    language: string;
};

export interface MediaPayload {
    url?: string;
    cdn: boolean;
    caption?: string;
    type: MediaType;
};

export interface TextPayload {
    text: string;
};