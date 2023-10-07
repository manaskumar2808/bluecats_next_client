import { AppState } from '..';

export const getUserSelector = (state: AppState) => state?.Auth?.user;
export const getAuthSelector = (state: AppState) => state?.Auth?.auth;
export const getAuthLoaderSelector = (state: AppState) => state?.Auth?.loader;
export const getAuthErrorSelector = (state: AppState) => state?.Auth?.error;