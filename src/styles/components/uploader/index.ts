import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
`;

export const Display = styled.div`
    position: relative;
    height: 260px;
    width: 100%;
    background-color: #ccc;
    overflow: hidden;
    border-radius: 5px;

    @media (max-width: 500px) {
        border-radius: 0;
    }
`;

export const PlaceholderContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;

export const PlaceholderText = styled.p`
    font-size: 15px;
    font-weight: 400;
    color: #404040;
    margin: 0;
`;

export const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: contain;
`;

export const Col = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
`;