import { AuthMode } from "./auth";

export const BASE_ROUTE = 'http://localhost:3000';
export enum RouteEnum {
    HOME = '/',
    POST = '/post',
    AUTH = '/auth',
    LOGIN = `/auth?mode=${AuthMode.LOGIN}`,
    SIGNUP = `/auth?mode=${AuthMode.SIGNUP}`,
    LOGOUT = '/auth/logout',
    PROFILE = '/profile',
};