import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 10px;
`;

export const SaveContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    
    @media (max-width: 500px) {
        justify-content: center;
    }
`;

export const ButtonWrapper = styled.div`
    flex: 1;
`;

export const Error = styled.p`
    font-size: 12px;
    font-weight: 400;
    color: #a60000;
`;