import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;

    @media (max-width: 500px) {
        padding: 10px;
    }
`;

export const Legend = styled.p`
    font-weight: 400;
    font-size: 16px;
    color: #101010;
    margin: 10px 5px;
`;

export const Grid = styled.div`
    display: grid;
    column-count: 3;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;

    @media (max-width: 500px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
`;