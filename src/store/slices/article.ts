import { BASE_URL, EndpointsEnum } from '@/constants/server';
import { ArticleType } from '@/types/article';
import headerConfig from '@/utility/request';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { HYDRATE } from 'next-redux-wrapper';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();

export interface ArticleState {
    articles: ArticleType[],
    loader: boolean,
    error: string | undefined | null,
};

export interface ArticleRequestPayload {
    formData: FormData;
    token: string;
}

const initialState: ArticleState = {
    articles: [],
    loader: false,
    error: null,
};


export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
    const response = await axios.get(`${config?.BASE_URL}/${config?.ARTICLE}`);
    const data = response?.data;
    return data;
});

export const postArticle = createAsyncThunk('articles/postArticle', async (payload: ArticleRequestPayload) => {
    const response = await axios.post(`${config?.BASE_URL}/${config?.ARTICLE}`, payload?.formData, headerConfig(payload?.token));
    const data = response?.data;
    return data;
});

export const postDraft = createAsyncThunk('articles/postDraft', async (payload: ArticleRequestPayload) => {
    const response = await axios.post(`${config?.BASE_URL}/${config?.DRAFT}`, payload?.formData, headerConfig(payload?.token));
    const data = response?.data;
    return data;
});

export const articleSlice = createSlice({
    name: 'Article',
    initialState,
    reducers: {
        updateArticles: (state, action) => {
            state.articles = action?.payload?.articles;
            state.loader = false;
            state.error = null;
        },
        failedArticles: (state, action) => {
            state.articles = [];
            state.loader = false;
            state.error = action?.payload?.error;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchArticles.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(fetchArticles.fulfilled, (state, action) => {
            state.loader = false;
            state.error = null;
            state.articles = action?.payload?.articles;
        })
        builder.addCase(fetchArticles.rejected, (state, action) => {
            state.loader = false;
            state.articles = [];
            state.error = action?.error?.message;
        })
        builder.addCase(postArticle.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(postArticle.fulfilled, (state) => {
            state.loader = false;
            state.error = null;
        })
        builder.addCase(postArticle.rejected, (state, action) => {
            state.loader = false;
            state.error = action?.error?.message;
        })
        builder.addCase(postDraft.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(postDraft.fulfilled, (state) => {
            state.loader = false;
            state.error = null;
        })
        builder.addCase(postDraft.rejected, (state, action) => {
            state.loader = false;
            state.error = action?.error?.message;
        })
        builder.addCase(HYDRATE, (state, action) => {})
    },
});

export const { failedArticles, updateArticles } = articleSlice?.actions;

export default articleSlice?.reducer;