import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.background};
    &::-webkit-scrollbar {
      width: 0;
      height: 5px;
    }
  
    &::-webkit-scrollbar-corner {
      background: transparent;
    }
  
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: transparent;
    }
  
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }

  body, input, textarea, button {
    font-weight: 500;
    font-size: 1rem;
    font-family: Arial, Helvetica, sans-serif;
  }

  input {
    border: none;
    background-color: transparent;
    &:focus {
      outline: none;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    font-family: Montserrat, sans-serif;
    color: ${(props) => props.theme.colors.white};
  }

  h1 {
    font-size: 1.8rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  button {
    cursor: pointer;
  }

  span {
    color: ${(props) => props.theme.colors.white};
    font-size: .85rem;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
