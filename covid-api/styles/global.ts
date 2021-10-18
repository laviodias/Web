import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
        font-family: 'Raleway', sans-serif;
    }

    .body {
        display: flex;
        flex-direction: column;
        align-items: center;

        #logo{
            width: 59px;
            height: 41px;
            margin-top: 2.4rem;
            cursor: pointer;
        }

    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 90vh;
        width: 100%;

    }
`

export default GlobalStyle
