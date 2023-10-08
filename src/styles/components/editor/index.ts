import styled from "styled-components";
import { setSyntheticLeadingComments } from "typescript";

export const Container = styled.div`
    position: relative;
    height: 600px;
    width: 100%;
    border: 0.5px solid #ccc;
    border-radius: 5px;
    overflow: hidden;

    @media (max-width: 500px) {
        border: none;
        padding: 10px;
        height: 85%;
    }
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;

    @media (max-width: 800px) {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
    }
`;

export const Display = styled.div`
    flex: 1;
    height: 100%;
    background-color: #ccc;
    overflow: hidden;

    @media (max-width: 800px) {
        width: 100%;
    }

    @media (max-width: 500px) {
        max-height: 250px;
        border-radius: 10px;
    }
`;

export const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: contain;
`;

export const Info = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;

    @media (max-width: 800px) {
        width: 100%;
    }

    @media (max-width: 500px) {
        padding: 20px 0;
    }
`;

export const QuillContainer = styled.div`
    height: 200px;
`;

export const LoaderContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;

export const Text = styled.p`
    font-size: 12px;
    font-weight: 400;
    color: #000111;
`;