import { DraftArticle, PostArticle } from "@/types/article";

const emptyField = (val: string | undefined) => {
    return !val || val?.trim?.()?.length === 0;
}

export const validPostArticle = ({ title, content }: PostArticle) => {
    return !(emptyField(title) || emptyField(content));
}

export const validDraftArticle = ({ id, title, content }: DraftArticle) => {
    if(!emptyField(id))
        return true;
    return !emptyField(title) || !emptyField(content);
}