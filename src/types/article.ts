import { ArticleMode } from "@/constants/article";
import { UserDoc } from "../../types/next-auth";
import { SegmentObj } from "@/constants/segment";

export type ArticleType = {
    id: string;
    title: string;
    content?: string;
    segments: SegmentObj[];
    author: UserDoc;
    mode?: ArticleMode;
    image?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PostArticle {
    title: string;
    content?: string;
    segments: SegmentObj[];
    image?: string;
    file?: string;
}

export interface DraftArticle {
    id?: string;
    title: string;
    content?: string;
    segments: SegmentObj[];
    image?: string;
    file?: string;
}