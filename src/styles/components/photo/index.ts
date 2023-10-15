import styled from "styled-components";
import NextImage from 'next/image';

export const Loader = styled.div`
    width: 100%;
    height: 400px;
    overflow: hidden;
`;

export const Image = styled(NextImage)`
    position: absolute;
    object-fit: contain;
`;