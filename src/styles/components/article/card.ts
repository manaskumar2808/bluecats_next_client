import styled from "styled-components";
import Image from 'next/image';

export const Container = styled.div`
    cursor: pointer;
    width: 100%;
    /* height: 400px; */
    justify-content: center;
    padding: 30px 0 10px;
    border-bottom: 0.5px solid #eee;

    @media (max-width: 500px) {
        width: 100%;
    }
`;

export const Header = styled.div``;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

export const HeaderItem = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
`;

export const Display = styled.div`
    position: relative;
    height: 230px;
    width: 100%;
    border-radius: 5px;
    background-color: #ccc;
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

export const Content = styled.div`
    .content {
        width: 100%;
        overflow: hidden;
        justify-content: center;
        font-size: 12px;
        height: 100px;
        position: relative;
        color: #808080;

        @media (max-width: 500px) {
            /* padding: 16px; */
        }
    }

    .content:after {
        content: "";
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 0;
        pointer-events: none;
        background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255, 1) 90%);
        width: 100%;
        height: 4em;
    }

    .content img {
        width: 100%;
        margin: auto;
        justify-self: center;
        align-self: center;
    }
`;

export const Author = styled.p`
    cursor: pointer;
    font-size: 13px;
    font-weight: 400;
    color: #1894ff;
    z-index: 50;
    margin: 0;

    &:hover {
        color: #0248ab;
    }
`;

export const Timestamp = styled.p`
    font-size: 10px;
    font-weight: 400;
    color: #858585;
    z-index: 50;
    margin: 0;
`;

export const ReadMore = styled.p`
    cursor: pointer;
    font-size: 12px;
    font-weight: 400;
    color: #1894ff;
    z-index: 50;
    margin: 0;

    &:hover {
        color: #0248ab;
    }
`;