import styled from "styled-components";
import Image from 'next/image';

export const Container = styled.div`
    cursor: pointer;
    width: 250px;
    height: 300px;
    border-radius: 10px;
    border: 0.5px solid #ccc;
    justify-content: center;
    padding: 20px;

    @media (max-width: 500px) {
        width: 100%;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
`;

export const Display = styled.div`
    position: relative;
    height: 160px;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
`;

export const Photo = styled(Image)`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

export const Title = styled.h3`
    font-size: 15px;
    font-weight: 500;
    color: #101010;
    max-lines: 3;
`;

export const Author = styled.p`
    font-size: 13px;
    font-weight: 400;
    color: #1894ff;
`;