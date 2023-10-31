import styled from "styled-components";

export const Container = styled.div``;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

export const AddButton = styled.div<{ rotate: boolean }>`
    position: relative;
    border-radius: 100%;
    background-color: #fff;
    border: 0.5px solid #ccc;
    height: 45px;
    width: 45px;
    transform: ${({ rotate }) => rotate ? 'rotate(45deg)' : 'rotate(0deg)'};
`;

export const AddIconContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    justify-content: center;
    align-items: center;
    margin: 0;
`;