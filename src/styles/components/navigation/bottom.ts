import styled from "styled-components";

export const Container = styled.div`
    background-color: #fff;
    z-index: 100;
    padding: 0;
    box-sizing: border-box;
    justify-content: center;
    width: fit-content;
    border-radius: 20px;
    border: 0.5px solid #ccc;
    margin: 10px auto;
`;

export const NavBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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