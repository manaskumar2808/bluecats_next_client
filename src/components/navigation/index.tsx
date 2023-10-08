import { Container, NavBar } from "@/styles/components/navigation";
import NavItem from "./nav-item";
import { NavItemEnum } from "@/constants";
import { AccessEnum } from "@/constants/access";
import { NavBarType, navs } from "@/constants/navigation";
import TopNavigation from "./top";
import BottomNavigation from "./bottom";

interface NavigationProps {
    isAuth: boolean | undefined;
    navBarType: NavBarType;
};

const Navigation = ({ isAuth, navBarType = NavBarType.TOP }: NavigationProps) => {
    const access = isAuth ? AccessEnum.AUTH : AccessEnum.GUEST;

    switch(navBarType) {
        case NavBarType.TOP:
            return <TopNavigation access={access} navs={navs} />
        case NavBarType.BOTTOM:
            return <BottomNavigation access={access} navs={navs} />
        default:
            return <TopNavigation access={access} navs={navs} />
    }
}

export default Navigation;