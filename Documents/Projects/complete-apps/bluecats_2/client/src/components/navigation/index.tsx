import { Container, NavBar } from "@/styles/components/navigation";
import NavItem from "./nav-item";
import { AppConstants, NavItemEnum } from "@/constants";

const Navigation = () => {
    const navs: NavItemType[] = [
        { id: 'nav_brand', title: AppConstants.NAME, path: '/' },
        { id: 'nav_home', title: 'Home', path: '/' },
        { id: 'nav_post_article', title: 'Post Article', path: '/post' },
        // { id: 'nav_about_us', title: 'About Us', path: '/about-us' },
        { id: 'nav_login', title: 'Login', path: '/login' },
    ];

    return (
        <Container>
            <NavBar>
                {<NavItem navItem={navs?.find(nav => nav?.id === 'nav_brand')} type={NavItemEnum.BRAND} />}
                <div style={{ flex: 1 }} />
                {navs.filter(nav => nav?.id !== 'nav_brand').map((navItem) => <NavItem key={navItem?.id} navItem={navItem} />)}
            </NavBar>
        </Container>
    );
}

export default Navigation;