import { DraftArticle, PostArticle } from "@/types/article";
import Pako, { Data } from "pako";
import { isBase64 } from ".";

const emptyField = (val: string | undefined) => {
    return !val || val?.trim?.()?.length === 0;
}

export const validPostArticle = ({ title, segments }: PostArticle) => {
    return !(emptyField(title) || segments?.length === 0);
}

export const validDraftArticle = ({ id, title, segments }: DraftArticle) => {
    if(!emptyField(id))
        return true;
    return !emptyField(title) || segments?.length > 0;
}

export const needDecompression = (content?: string) => {
    return content && isBase64(content);
}

export const compressContent = (content: string) => {
    if(!content)
        return content;
    const compressedData = Pako.gzip(content);
    const compressedBuffer = Buffer.from(compressedData);
    const base64 = compressedBuffer.toString('base64');
    return base64;
}

export const decompressContent = (base64?: string): string => {
    if(!base64)
        return '';
    if(!needDecompression(base64))
        return base64;
    const compressedBuffer = Buffer.from(base64, 'base64');
    const decompressedContent = Pako.ungzip(compressedBuffer, { to: 'string' });
    return decompressedContent;
}