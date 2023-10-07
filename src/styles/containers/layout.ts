import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const Header = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
`;

export const Body = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    z-index: 50;
    padding: 20px 0;
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