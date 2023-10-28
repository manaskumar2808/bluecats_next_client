import Photo from "@/components/photo";
import styled from "styled-components";

export const Container = styled.div`
    justify-content: center;
    align-items: center;
`;

export const Display = styled.div<{ aspectratio?: number }>`
    width: 100%;
    position: relative;
    padding-bottom: ${({ aspectratio = 0.5625 }) => `${aspectratio * 100}%`};
    border-radius: 5px;
    border: none;
    margin: auto;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const Image = styled(Photo)`
    width: 100%;
    height: 100%;
    border-radius: 5px;
`;

export const Caption = styled.p`
    font-size: 13px;
    color: #424242;
    font-weight: 400;
    text-align: center;
    margin: 10px 0;
`;