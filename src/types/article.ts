import { UserDoc } from "../../types/next-auth";

export type ArticleType = {
    id: string;
    title: string;
    content: string;
    author: UserDoc;
    image?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PostArticle {
    title: string;
    content: string;
    author: string;
    image?: string;
    file?: string;
}