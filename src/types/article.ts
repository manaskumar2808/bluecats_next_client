import { ArticleMode } from "@/constants/article";
import { UserDoc } from "../../types/next-auth";

export type ArticleType = {
    id: string;
    title: string;
    content: string;
    author: UserDoc;
    mode?: ArticleMode;
    image?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PostArticle {
    title: string;
    content: string;
    image?: string;
    file?: string;
}

export interface DraftArticle {
    id?: string;
    title: string;
    content: string;
    image?: string;
    file?: string;
}