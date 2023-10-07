import styled from "styled-components";

export const Container = styled.div`
    height: 500px;
    position: relative;
`;

export const Box = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 100px;
    justify-content: center;
    text-align: center;
`;

export const Title = styled.h2`
    font-size: 18px;
    font-weight: 700;
    color: #a30000;
`;

export const Description = styled.p`
    font-size: 18px;
    font-weight: 700;
    color: #000111;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;