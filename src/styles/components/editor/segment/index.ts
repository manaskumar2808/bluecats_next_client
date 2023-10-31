import styled from "styled-components";

export const Container = styled.div`
    position: relative;
`;

export const ActionContainer = styled.div`
    position: absolute;
    top: 50%;
    right: -40px;
    transform: translate(0,-50%);
`;

export const TrashIconContainer = styled.div`
    cursor: pointer;
    position: relative;
    border-radius: 100%;
    height: 30px;
    width: 30px;
    border: 0.5px solid red;
    justify-content: center;
`;

export const TrashIconWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;