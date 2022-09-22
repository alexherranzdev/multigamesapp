import css from 'styled-jsx/css'

import { colors, fonts } from '../../styles/theme'

export const globalStsyles = css.global`
  html,
  body {
    padding: 0;
    margin: 0;
    overflow: hidden;
    font-family: ${fonts.base};
    height: 100%;
  }

  body > div {
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }

  textarea,
  input {
    font-family: ${fonts.base};
  }

  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 auto;
    max-width: 1080px;
    overflow: hidden;
    /* overflow-y: auto; */
    position: relative;
    background: ${colors.white};
  }
`

export default css`
  .quiz {
    background-color: ${colors.quiz.secondary};
    color: ${colors.quiz.text};
  }
`
