import { Container, NavBar } from "@/styles/components/navigation";
import NavItem from "./nav-item";
import { AppConstants, NavItemEnum } from "@/constants";
import { RouteEnum } from "@/constants/route";
import { NavItemType } from "@/types/navitem";
import { AccessEnum } from "@/constants/access";

interface NavigationProps {
    isAuth: boolean | undefined;
};

const Navigation = ({ isAuth }: NavigationProps) => {
    const access = isAuth ? AccessEnum.AUTH : AccessEnum.GUEST;

    const navs: NavItemType[] = [
        { id: 'nav_brand', title: AppConstants.NAME, path: RouteEnum.HOME, showFor: [AccessEnum.AUTH, AccessEnum.GUEST, AccessEnum.ADMIN] },
        { id: 'nav_home', title: 'Home', path: RouteEnum.HOME, showFor: [AccessEnum.AUTH, AccessEnum.GUEST, AccessEnum.ADMIN] },
        { id: 'nav_post_article', title: 'Post Article', path: RouteEnum.POST, showFor: [AccessEnum.AUTH, AccessEnum.ADMIN] },
        { id: 'nav_login', title: 'Login', path: RouteEnum.LOGIN, showFor: [AccessEnum.GUEST] },
        { id: 'nav_signup', title: 'Signup', path: RouteEnum.SIGNUP, showFor: [AccessEnum.GUEST] },
        { id: 'nav_profile', title: 'Profile', path: RouteEnum.PROFILE, showFor: [AccessEnum.AUTH, AccessEnum.ADMIN] },
        { id: 'nav_logout', title: 'Logout', path: RouteEnum.LOGOUT, showFor: [AccessEnum.AUTH, AccessEnum.ADMIN] },
    ];

    return (
        <Container>
            <NavBar>
                {<NavItem navItem={navs?.find(nav => nav?.id === 'nav_brand')} type={NavItemEnum.BRAND} />}
                <div style={{ flex: 1 }} />
                {navs.filter(nav => nav?.showFor?.includes(access)).filter(nav => nav?.id !== 'nav_brand').map((navItem) => <NavItem key={navItem?.id} navItem={navItem} />)}
            </NavBar>
        </Container>
    );
}

export default Navigation;