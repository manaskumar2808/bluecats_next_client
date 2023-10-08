import { saveAuthData } from '@/utility/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();

export interface LoginPayload {
    userName: string;
    password: string;
};

export interface SignupPayload {
    userName: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    rand?: number;
};

export interface UserUpdatePayload {
    id: string;
    userName: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
};

export interface AuthState {
    user: null | object;
    auth: boolean;
    loader: boolean;
    error: null | string;
};

const initialState: AuthState = {
    user: null,
    auth: false,
    loader: false,
    error: null,
}

export const login = createAsyncThunk('auth/login', async (payload: LoginPayload) => {
    const response = await axios.post(`${config?.BASE_URL}/${config?.LOGIN}`, payload);
    return response?.data;
});

export const signup = createAsyncThunk('auth/signup', async (payload: SignupPayload) => {
    const response = await axios.post(`${config?.BASE_URL}/${config?.SIGNUP}`, payload);
    return response?.data;
});

export const updateUser = createAsyncThunk('user/update', async (payload: UserUpdatePayload) => {
    const response = await axios.put(`${config?.BASE_URL}/${config?.USER}/${payload?.id}`, payload);
    return response?.data;
});

export const authSlice = createSlice({
    name: 'Auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loader = false;
            state.auth = true;
            state.error = null;
            const user = action?.payload?.user;
            const token = action?.payload?.token;
            const expiryDate = action?.payload?.expiryDate;
            state.user = user;
            saveAuthData(user, token, expiryDate);
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loader = false;
            state.auth = false;
            state.error = action?.error?.message || 'Error occurred in login!';
            state.user = null;
        })

        builder.addCase(signup.pending, (state) => {
            state.loader = true;
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.loader = false;
            state.auth = true;
            state.error = null;
            const user = action?.payload?.user;
            const token = action?.payload?.token;
            const expiryDate = action?.payload?.expiryDate;
            state.user = user;
            saveAuthData(user, token, expiryDate);
        })
        builder.addCase(signup.rejected, (state, action) => {
            state.loader = false;
            state.auth = false;
            state.error = action?.error?.message || 'Error occurred in signup!';
            state.user = null;
        })

        builder.addCase(updateUser?.pending, (state) => {
            state.loader = true;
            state.error = null;
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loader = false;
            state.error = null;
            state.user = action?.payload?.user;
        })
        builder.addCase(updateUser?.rejected, (state, action) => {
            state.loader = false;
            state.error = action?.error?.message || 'Error occured while updating user data!';
            state.user = null;
        })
    }
});

export default authSlice?.reducer;