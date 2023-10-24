import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    background-color: #fff;
    z-index: 100;
    padding: 0 10px;
    box-sizing: border-box;
`;

export const NavBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @media (max-width: 500px) {
        display: none;
    }
`;