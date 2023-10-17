import Photo from "@/components/photo";
import styled from "styled-components";

export const Container = styled.div<{ radius: number, border?: boolean }>`
    position: relative;
    height: ${({ radius }) => `${radius * 2}px`};
    width: ${({ radius }) => `${radius * 2}px`};
    border: ${({ border }) => border ? `0.5px solid #ccc` : 'none'};
    border-radius: 100%;
    overflow: hidden;
`;

export const Image = styled(Photo)`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;