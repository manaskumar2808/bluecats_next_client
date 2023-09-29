export type ArticleType = {
    id: string;
    title: string;
    content: string;
    author: string;
    image?: string;
}

export interface PostArticle {
    title: string;
    content: string;
    author: string;
    image?: string;
    file?: string;
}