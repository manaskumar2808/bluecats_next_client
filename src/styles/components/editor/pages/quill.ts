import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 400px;

    @media (max-width: 800px) {
        max-height: 200px;
    }

    @media (max-width: 500px) {
        max-height: 250px;
    }

    @media (max-width: 400px) {
        max-height: 200px;
    }
`;