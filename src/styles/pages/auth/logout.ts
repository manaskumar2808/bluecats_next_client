import styled from "styled-components";

export const Container = styled.div`
    height: 500px;
    position: relative;
`;

export const Box = styled.div`
    height: 120px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    justify-content: center;
    text-align: center;
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h2`
    font-size: 18px;
    font-weight: 700;
    color: #a30000;
`;

export const Description = styled.p`
    font-size: 16px;
    font-weight: 400;
    color: #000111;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
`;

export const ButtonWrapper = styled.div`
    flex: 1;
`;