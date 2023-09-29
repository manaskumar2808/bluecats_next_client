import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.div`
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
`;

export const NavLink = styled(Link)`
    text-decoration: none;
    color: #000101;
`;

export const NavBrand = styled.h1`
    font-size: 30px;
    font-weight: 700;
    color: #100011;
    

    &:first-letter {
        color: #1894ff;
    }
`;

export const NavText = styled.p``;