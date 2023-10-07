import { AppState } from "..";

export const getArticleSelector = (state: AppState) => state?.Article?.articles;
export const getArticleLoaderSelector = (state: AppState) => state?.Article?.loader;
export const getArticleErrorSelector = (state: AppState) => state?.Article?.error;