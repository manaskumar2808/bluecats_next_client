import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.div`
    padding: 10px 20px;
    justify-content: center;
    align-items: center;

    @media (max-width: 500px) {
        padding: 5px 15px;
    }
`;

interface NavProps {
    active: boolean;
};

export const NavLink = styled(Link)<NavProps>`
    text-decoration: none;
    color: ${({ active }) => active ? '#1894ff' : '#000101'};
    display: flex;
    flex-direction: row;
    gap: 5px;
`;

export const NavBrand = styled.h1`
    font-size: 30px;
    font-weight: 700;
    color: #262626;
    margin: 0;

    &:first-letter {
        color: #1894ff;
    }
`;

export const NavIcon = styled.div<NavProps>`
    display: none;
    justify-content: center;
    align-items: center;
    background-color: ${({ active }) => active ? '#1894ff' : '#262626'};
    border-radius: 10px;
    padding: 5px;

    @media (max-width: 500px) {
        display: block;
    }
`;

export const NavText = styled.p<NavProps>`
    display: block;
    margin: 0;
    color: ${({ active }) => active ? '#1894ff' : '#404040'};

    @media (max-width: 500px) {
        display: none;
    }
`;