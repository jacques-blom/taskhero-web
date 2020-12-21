import {css} from 'styled-components'

export const card = css<{disabled?: boolean}>`
    border-radius: 25px;
    background-color: ${(props) => props.theme.card};
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 15px;
    height: 50px;
    margin-bottom: 20px;
    outline: 0;
    box-sizing: border-box;
    border: 1px solid transparent;
    transition: 0.25s border ease-in-out;

    :focus {
        border: 1px solid rgba(255, 255, 255, 0.5);
    }

    ${(props) =>
        props.disabled &&
        css`
            pointer-events: none;
            opacity: 0.5;
        `}
`
