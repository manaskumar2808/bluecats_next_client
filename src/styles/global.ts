import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Mooli';
        src: url('../assets/Mooli/Mooli-Regular.ttf');
        font-weight: 400;
        font-style: normal;
    }

    * {
        /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif, 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif, 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif, 'Arial Narrow', Arial, sans-serif, Geneva, Tahoma, sans-serif; */
        font-family: Montserrat;
    }

    body {
        margin: 0;
        min-width: 500px;
        height: 100vh;

        @media (max-width: 500px) {
            min-width: 100%;
            width: 100%;
        }
    }
`;

export default GlobalStyles;