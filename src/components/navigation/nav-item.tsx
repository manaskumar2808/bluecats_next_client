import { NavItemEnum } from '@/constants';
import { Container, NavBrand, NavLink, NavText } from '@/styles/components/navigation/nav-item';
import { NavItemType } from '@/types/navitem';

type NavItemProps = {
    navItem?: NavItemType;
    type?: NavItemEnum;
}

const NavItem = ({ navItem, type = NavItemEnum.TAB }: NavItemProps) => {
    if(!navItem)
        return;

    const { title, path } = navItem;

    return (
        <Container>
            <NavLink href={path}>
                {type === NavItemEnum.TAB ? <NavText>{title}</NavText> : <NavBrand>{title}</NavBrand>}
            </NavLink>
        </Container>
    );
}

export default NavItem;