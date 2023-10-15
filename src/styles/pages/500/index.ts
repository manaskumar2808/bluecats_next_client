import styled from "styled-components";

export const Container = styled.div`
    height: 500px;
    width: 100%;
    position: relative;
`;

export const Fallback = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const Title = styled.h1`
    font-size: 26px;
    font-weight: 700;
    color: #1894ff;
`;

export const Description = styled.p`
    font-size: 16px;
    font-weight: 400;
    color: #101010;
`;