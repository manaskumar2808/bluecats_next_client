import styled from "styled-components";

export const Container = styled.div`
    cursor: pointer;
    position: relative;
    height: 35px;
    width: 35px;
    border-radius: 5px;
    border: 0.5px solid #ccc;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

export const TextContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;

export const Text = styled.p`
    margin: 0;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    color: #000111;
    text-align: center;
    vertical-align: baseline;
`;

export const Bold = styled.p`
    font-weight: 600;
`;