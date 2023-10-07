import { AuthData } from '@/constants/auth';
import { User } from '@/types/user'

export const saveAuthData = (user: User, token: string, expiryDate: string) => {
    localStorage.setItem(AuthData.ID, user?.id);
    localStorage.setItem(AuthData.TOKEN, token);
    localStorage.setItem(AuthData.EXPIRY_DATE, expiryDate);
}