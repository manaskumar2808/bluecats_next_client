import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 400px;

    @media (max-width: 800px) {
        height: 180px;
    }

    @media (max-width: 500px) {
        height: 230px;
    }

    @media (max-width: 400px) {
        height: 180px;
    }
`;