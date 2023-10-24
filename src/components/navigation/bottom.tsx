import { NavItemType } from "@/types/navitem"
import { Container, NavBar } from '@/styles/components/navigation/bottom';
import NavItem from "./nav-item";
import { NavItemEnum } from "@/constants";
import { NavBarType } from "@/constants/navigation";
import { AccessEnum } from "@/constants/access";
import { useEffect, useState } from "react";

interface BottomNavigationProps {
    navs: NavItemType[];
    access: AccessEnum;
};

const BottomNavigation = ({ navs, access }: BottomNavigationProps) => {
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        }
    }, [lastScrollTop]);

    function scrollHandler() {
        var st = window?.scrollY || document?.documentElement?.scrollTop; 
        if (st < lastScrollTop) {
            setVisible(true);
        } else if(st > lastScrollTop) {
            setVisible(false);
        }
        setLastScrollTop(st <= 0 ? 0 : st);
    }


    return (
        <Container visible={visible}>
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