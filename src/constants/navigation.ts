import { NavItemType } from "@/types/navitem";
import { AppConstants } from ".";
import { AccessEnum } from "./access";
import { RouteEnum } from "./route";
import { RiAddBoxLine, RiHome2Line, RiLoginCircleLine, RiLogoutCircleLine, RiUserAddLine } from 'react-icons/ri';
import { TbUserCircle } from 'react-icons/tb';

export enum NavBarType {
    TOP = 'TOP',
    BOTTOM = 'BOTTOM',
};

export const navs: NavItemType[] = [
    { id: 'nav_brand', title: AppConstants.NAME, path: RouteEnum.HOME, showFor: [AccessEnum.AUTH, AccessEnum.GUEST, AccessEnum.ADMIN] },
    { id: 'nav_home', title: 'Home', Icon: RiHome2Line, path: RouteEnum.HOME, showFor: [AccessEnum.AUTH, AccessEnum.GUEST, AccessEnum.ADMIN] },
    { id: 'nav_post_article', title: 'Post Article', Icon: RiAddBoxLine, path: RouteEnum.POST, showFor: [AccessEnum.AUTH, AccessEnum.ADMIN] },
    { id: 'nav_login', title: 'Login', Icon: RiLoginCircleLine, path: RouteEnum.LOGIN, showFor: [AccessEnum.GUEST] },
    { id: 'nav_signup', title: 'Signup', Icon: RiUserAddLine, path: RouteEnum.SIGNUP, showFor: [AccessEnum.GUEST] },
    { id: 'nav_profile', title: 'Profile', Icon: TbUserCircle, path: RouteEnum.PROFILE, showFor: [AccessEnum.AUTH, AccessEnum.ADMIN] },
    { id: 'nav_logout', title: 'Logout', Icon: RiLogoutCircleLine, path: RouteEnum.LOGOUT, showFor: [AccessEnum.AUTH, AccessEnum.ADMIN] },
];