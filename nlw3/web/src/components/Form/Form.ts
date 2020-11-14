import { Form as UnForm } from '@unform/web';
import styled from 'styled-components';

const Form = styled(UnForm)`
    width: 700px;
    margin: 0 auto 64px auto;

    background: #FFFFFF;
    border: 1px solid #D3E2E5;
    border-radius: 20px;

    padding: 64px 80px;

    overflow: hidden;

    fieldset { 
        border: 0;

        + fieldset {
            margin-top: 80px;
        }

        legend {
            width: 100%;

            font-size: 32px;
            line-height: 34px;
            color: #5C8599;
            font-weight: 700;

            border-bottom: 1px solid #D3E2E5;
            margin-bottom: 40px;
            padding-bottom: 24px;
        }
    }

    .input-block {
        + .input-block {
            margin-top: 24px;
        }  

        label {
            display: flex;
            color: #8FA7B3;
            margin-bottom: 8px;
            line-height: 24px;

            span {
                font-size: 14px;
                color: #8FA7B3;
                margin-left: 24px;
                line-height: 24px;
            }

        }

        input, textarea {
            width: 100%;
            background: #F5F8FA;
            border: 1px solid #D3E2E5;
            border-radius: 20px;
            outline: none;
            color: #5C8599;

        }

        input {
            height: 64px;
            padding: 0 16px;
        }

        textarea {
            min-height: 120px;
            max-height: 240px;
            resize: vertical;
            padding: 16px;
            line-height: 28px;
        }
    }

    button.confirm-button {
        margin-top: 64px;

        width: 100%;
        height: 64px;
        border: 0;
        cursor: pointer;
        background: #3CDC8C;
        border-radius: 20px;
        color: #FFFFFF;
        font-weight: 800;

        display: flex;
        justify-content: center;
        align-items: center;

        transition: background-color 0.2s;

        svg {
            margin-right: 16px;
        }

        :hover {
            background: #36CF82;
        }
    }

    button.denied {
        background: #FF669D;

        :hover {
            background: #de5b8a;
        }
    }

    .btn-group {
        display: flex;
        justify-content: space-between;
    }
    .btn-group button {
        flex: 1;

        max-width: 48%;
    }
`;

export default Form;