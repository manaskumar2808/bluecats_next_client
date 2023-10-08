import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    background-color: #fff;
    z-index: 100;
    /* border: 1px solid #ccc; */
    padding: 0 10px;
    box-sizing: border-box;

    @media (max-width: 500px) {
        
    }
`;

export const NavBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;