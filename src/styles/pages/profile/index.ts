import Image from "next/image";
import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Box = styled.div`
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%); */
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Display = styled.div`
    position: relative;
    height: 150px;
    width: 150px;
    border-radius: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: auto;
    border: 0.5px solid #ccc;
`;

export const Photo = styled(Image)`
    height: 100%;
    width: 100%;
    object-fit: cover;
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