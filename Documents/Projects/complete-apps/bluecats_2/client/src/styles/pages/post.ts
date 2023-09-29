import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    height: 500px;
`;

export const EditorContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
`;

export const ButtonContainer = styled.div`
    height: 50px;
    padding: 0 10px;
`;