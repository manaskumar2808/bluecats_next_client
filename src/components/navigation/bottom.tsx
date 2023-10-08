import { NavItemType } from "@/types/navitem"
import { Container, NavBar } from '@/styles/components/navigation/bottom';
import NavItem from "./nav-item";
import { NavItemEnum } from "@/constants";
import { NavBarType } from "@/constants/navigation";
import { AccessEnum } from "@/constants/access";

interface BottomNavigationProps {
    navs: NavItemType[];
    access: AccessEnum;
};

const BottomNavigation = ({ navs, access }: BottomNavigationProps) => {
    return (
        <Container>
            <NavBar>
                {navs?.filter(nav => nav?.showFor?.includes(access))?.filter(nav => nav?.id !== 'nav_brand')?.map(nav => <NavItem 
                    key={nav?.id} 
                    navItem={nav} 
                    type={NavItemEnum.TAB} 
                    navBarType={NavBarType.BOTTOM} 
                />)}
            </NavBar>
        </Container>
    );
}

export default BottomNavigation;