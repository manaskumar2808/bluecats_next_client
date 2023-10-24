import styled, { keyframes } from "styled-components";

export const ShowKeyframes = keyframes`
    0% { transform: translateY(-10px) }
    100% { transform: translateY(10px) }
`;

export const HideKeyframes = keyframes`
    0% { transform: translateY(10px) }
    100% { transform: translateY(-10px) }
`;

export const Container = styled.div<{ visible: boolean }>`
    background-color: #262626;
    z-index: 100;
    padding: 0;
    box-sizing: border-box;
    justify-content: center;
    width: fit-content;
    border-radius: 20px;
    margin: 10px auto;
    transform: ${({ visible }) => `translateY(${visible ? -10 : 10}px)`};
    visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    transition: visibility 0.5s, opacity 0.5s, transform 0.5s;
`;

export const NavBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @media (max-width: 500px) {
        display: none;
    }
`;