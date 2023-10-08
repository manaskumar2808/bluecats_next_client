import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100vh;

    @media (min-width: 500px) {
        width: 100%;
        display: block;
    }
`;

export const Header = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
`;

export const Bottom = styled.div`
    display: none;
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    width: 100%;

    @media (max-width: 500px) {
        display: block;
    }
`;

export const Body = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    z-index: 50;
    padding: 20px 0;
    flex: 1;

    @media (max-width: 500px) {
        padding: 0;
    }
`;

export const Left = styled.div`
    flex: 1;

    @media (max-width: 1000px) {
        flex: 0;
    }
`;

export const Content = styled.div`
    flex: 5;

    @media (max-width: 1000px) {
        flex: 1;
        padding: 0 20px;
    }
    
    @media (max-width: 500px) {
        padding: 0;
        width: 100%;
        box-sizing: border-box;
    }
`;

export const Right = styled.div`
    flex: 1;

    @media (max-width: 1000px) {
        flex: 0;
    }
`;

export const Footer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`;