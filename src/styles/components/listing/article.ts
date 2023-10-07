import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
`;

export const Grid = styled.div`
    display: grid;
    column-count: 3;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
`;