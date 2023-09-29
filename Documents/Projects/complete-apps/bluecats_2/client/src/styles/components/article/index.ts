import styled from 'styled-components';
import NextImage from 'next/image';

export const Container = styled.div`
    width: 70%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Title = styled.h2`
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    color: #000000;
    text-align: center;
`;

export const Text = styled.p`
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    color: #000111;
    text-align: justify;
`;

export const Author = styled.h5`
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
    color: #1894FF;
    text-align: center;
`;

export const Display = styled.div`
    position: relative;
    /* width: 400px; */
    width: 100%;
    height: 400px;
    border-radius: 10px;
    border: none;
    margin: auto;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const Content = styled.div``;

export const Image = styled(NextImage)`
    object-fit: contain;
    border-radius: 10px;
    overflow: hidden;
`;