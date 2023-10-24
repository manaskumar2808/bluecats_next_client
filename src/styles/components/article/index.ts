import styled from 'styled-components';
import NextImage from 'next/image';

export const Container = styled.div`
    width: 70%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 500px) {
        width: 100%;
        gap: 10px;
        padding: 10px 16px;
    }
`;

export const Header = styled.div``;

export const HeaderItem = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h2`
    font-size: 19px;
    font-weight: 600;
    line-height: 22px;
    color: #000000;
    margin: 5px 5px;
`;

export const Text = styled.p`
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    color: #000111;
    text-align: justify;
`;

export const Author = styled.h5`
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
    color: #1894FF;
    margin: 0;

    &:hover {
        color: #0248ab;
    }
`;

interface DisplayProps {
    aspectRatio: number;
};

export const Display = styled.div<DisplayProps>`
    position: relative;
    width: 100%;
    padding-bottom: ${({ aspectRatio = 0.5625 }) => `${aspectRatio * 100}%`};
    border-radius: 5px;
    border: none;
    margin: auto;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media (max-width: 500px) {
        /* padding: 10px; */
    }
`;

export const Content = styled.div`
    .content {
        width: 100%;
        overflow: hidden;
        justify-content: center;

        @media (max-width: 500px) {
            /* padding: 16px; */
        }
    }

    .content img {
        width: 100%;
        margin: auto;
        justify-self: center;
        align-self: center;
    }
`;

export const Image = styled(NextImage)`
    object-fit: contain;
    /* border-radius: 10px; */
    overflow: hidden;
`;

export const ShareContainer = styled.div`
    justify-content: center;
    margin: auto;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

export const Timestamp = styled.p`
    font-size: 12px;
    font-weight: 400;
    color: #858585;
    z-index: 50;
    margin: 0;
`;