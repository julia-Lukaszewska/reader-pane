// resetBaseStyles.js
import { css } from 'styled-components'

const resetBaseStyles = css`
  * {
    transition:
      background-color 0.3s,
      border 0.3s,
      color 0.3s;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    height: 100%;
    overflow: hidden;
    font-size: 62.5%;
  }

  body {
    min-height: 100vh;
    font-size: 1.6rem;
    line-height: 1.5;
    font-family: 'Poppins', sans-serif;
  }

  input,
  button,
  textarea,
  select {
    outline: none;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
  }

  button {
    cursor: pointer;
    font-family:
      'Segoe UI Emoji', 'Noto Color Emoji', 'Apple Color Emoji', sans-serif;
  }

  *:disabled {
    cursor: not-allowed;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    hyphens: auto;
    overflow-wrap: break-word;
  }

  img {
    display: block;
    max-width: 100%;
  }
`
export default resetBaseStyles
