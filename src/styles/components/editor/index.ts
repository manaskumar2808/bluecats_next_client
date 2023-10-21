import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: auto;
    border-radius: 5px;
    overflow: scroll;
`;

export const Col = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    width: 100%;
    gap: 20px;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 800px) {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
    }
`;

export const Display = styled.div`
    height: 260px;
    width: 100%;
    background-color: #ccc;
    overflow: hidden;
    border-radius: 5px;

    @media (max-width: 800px) {
        max-height: 300px;
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
    height: 100%;
    width: 100%;
    gap: 10px;

    @media (max-width: 800px) {
        width: 100%;
    }

    @media (max-width: 500px) {
        padding: 20px 0;
    }
`;

export const QuillContainer = styled.div`
    /* height: 200px; */
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