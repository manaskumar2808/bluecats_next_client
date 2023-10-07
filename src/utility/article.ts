import { PostArticle } from "@/types/article";

export const validPostArticle = ({ title, content, file, image, author }: PostArticle) => {
    if(!title || title?.trim().length === 0)
        return false;
    if(!content || content?.trim().length === 0)
        return false;
    if(!author || author?.trim().length === 0)
        return false;
    return true;
}