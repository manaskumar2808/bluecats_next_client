import { NavItemType } from "@/types/navitem"
import { Container, NavBar, Row } from '@/styles/components/navigation/top';
import NavItem from "./nav-item";
import { NavItemEnum } from "@/constants";
import { AccessEnum } from "@/constants/access";

interface TopNavigationProps {
    navs: NavItemType[];
    access: AccessEnum;
};

const TopNavigation = ({ navs, access }: TopNavigationProps) => {
    return (
        <Container>
            <NavBar>
                <NavItem navItem={navs?.find(nav => nav?.id === 'nav_brand')} type={NavItemEnum.BRAND} />
                <Row>
                    {navs?.filter(nav => nav?.showFor?.includes(access))?.filter(nav => nav?.id !== 'nav_brand')?.map(nav => <NavItem 
                        key={nav?.id} 
                        navItem={nav} 
                        type={NavItemEnum.TAB}
                    />)}
                </Row>
            </NavBar>
        </Container>
    );
}

export default TopNavigation;