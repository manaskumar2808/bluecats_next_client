import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    height: 500px;
    width: 100%;
`;

export const Box = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const Username = styled.h2`
    font-weight: 700;
    font-size: 40px;
`;

export const Name = styled.h5`
    font-weight: 500;
    font-size: 20px;
`;

export const Email = styled.p`
    font-weight: 400;
    font-size: 16px;
    color: #1894ff;
`;

export const Phone = styled.p`
    font-weight: 400;
    font-size: 16px;
    color: #101010;
`;