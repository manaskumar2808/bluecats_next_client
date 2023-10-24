import { NavItemEnum } from '@/constants';
import { NavBarType } from '@/constants/navigation';
import { Container, NavBrand, NavIcon, NavLink, NavText } from '@/styles/components/navigation/nav-item';
import { NavItemType } from '@/types/navitem';
import Image from 'next/image';
import { useRouter } from 'next/router';

type NavItemProps = {
    navItem?: NavItemType;
    type?: NavItemEnum;
    navBarType?: NavBarType;
}

const NavItem = ({ navItem, type = NavItemEnum.TAB, navBarType = NavBarType.TOP }: NavItemProps) => {
    const router = useRouter();
    
    if(!navItem)
        return;
    
    const { title, path, Icon } = navItem;
    
    const active = router?.pathname === path;
    const size = 24;
    // const color = active ? '#ffffff' : '#404040';
    const color = '#f5f5f5';

    return (
        <Container>
            <NavLink href={path}>
                {type === NavItemEnum.BRAND && navBarType === NavBarType.TOP && <Image src={'/images/logo/cat-64.png'} alt={'Logo'} height={30} width={30} />}
                {type === NavItemEnum.TAB && navBarType === NavBarType.BOTTOM && Icon && <NavIcon active={active}><Icon style={{ height: size, width: size, color }} /></NavIcon>}
                {type === NavItemEnum.TAB ? <NavText active={active}>{title}</NavText> : <NavBrand>{title}</NavBrand>}
            </NavLink>
        </Container>
    );
}

export default NavItem;