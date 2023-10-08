import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 400px;

    @media (max-width: 500px) {
        height: 300px;
    }
`;