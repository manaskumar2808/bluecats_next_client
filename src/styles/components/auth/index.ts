import Link from "next/link";
import styled from "styled-components";

export const Container = styled.div`
    height: 100%;
    width: 100%;
    margin: auto;

    @media (max-width: 500px) {
        padding: 0 10px;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    width: 100%;
    align-items: center;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
`;

export const Legend = styled.h2`
    font-size: 20px;
    font-weight: 700;
    color: #101010;
`;

export const Text = styled.p`
    font-size: 14px;
    font-weight: 400;
    color: #101010;
`;

export const Error = styled(Text)`
    color: red;    
`;

export const AuthLink = styled(Link)`
    font-size: 14px;
    font-weight: 400;
    color: #1894ff;
    text-decoration: none;
`;