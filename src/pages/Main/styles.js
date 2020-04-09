import styled, { keyframes, css } from 'styled-components';

const shake = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }

`;

const Form = styled.form.attrs((props) => ({
    isError: props.error,
}))`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input {
        flex: 1;
        border: 1px solid #eee;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
    }

    ${(props) =>
        props.error &&
        css`
            input {
                border: 1px solid red;
            }

            & {
                animation: ${shake} 0.5s;
            }
        `}
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(360deg)
    }
`;

const SubmitButton = styled.button.attrs((props) => ({
    type: 'submit',
    disabled: props.loading,
}))`
    background: #7159c1;
    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 4px;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: 0.5s;

    svg {
        margin-right: 0;
    }

    &:hover {
        opacity: 0.9;
    }

    &[disabled] {
        opacity: 0.4;
        cursor: not-allowed;
    }

    ${(props) =>
        props.loading &&
        css`
            svg {
                animation: ${rotate} 2s linear infinite;
            }
        `}
`;

const List = styled.ul`
    list-style: none;
    margin-top: 30px;

    li {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        a {
            text-decoration: none;
            color: #7159c1;
        }

        & + li {
            border-top: 1px solid #eee;
        }
    }
`;

const ErrorText = styled.span`
    font-size: 12px;
    color: red;
    margin-left: 10px;
`;

export { Form, SubmitButton, List, ErrorText };
