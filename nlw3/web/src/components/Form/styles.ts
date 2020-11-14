import styled from 'styled-components';

export const InputContainer = styled.label`
    display: flex;
    flex-direction: column;

    margin: 7.5px 0;

    > span {
        color: gray;
        margin: 7.5px 0;
    }

    > input, textarea {
        background: #F5F8FA;

        border: 1px solid #A1E9C5;
        border-radius: 20px;

        padding: 15px;
    }

    > input {
        height: 64px;
        padding: 0 16px;
    }

    > textarea {
        min-height: 120px;
        max-height: 240px;
        resize: vertical;
        padding: 16px;
        line-height: 28px;
    }

    input[type=file] {
        display: none;
    }

    .error {
        color: #FF669D;
    }
`; 

export const DecisionBoxContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    button {
        height: 64px;
        background: #F5F8FA;
        border: 1px solid #D3E2E5;
        color: #5C8599;
        cursor: pointer;


        :first-child {
            border-radius: 20px 0px 0px 20px;
        }

        :last-child {
            border-radius: 0 20px 20px 0;
            border-left: 0;
        }

    }

    .active {
        background: #EDFFF6;
        border: 1px solid #A1E9C5;
        color: #37C77F;
    }

`;

export const ImagePickerContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 16px;

    img {
        width: 100%;
        height: 96px;
        object-fit: cover;
        border-radius: 20px;
    }

    .new-image {
        height: 96px;
        background: #F5F8FA;
        border: 1px dashed #96D2F0;
        border-radius: 20px;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const MapPickerContainer = styled.div`
    background: #E6F7FB;
    border: 1px solid #B3DAE2;
    border-radius: 20px;

    margin-bottom: 40px;

    footer {
        padding: 20px 0;
        text-align: center;

        a, p {
            line-height: 24px;
            color: #0089A5;
            text-decoration: none;
        }
    }

    .leaflet-container {
        border-bottom: 1px solid #DDE3F0;
        border-radius: 20px;
    }

    .error{
        p, a, button {
            color: #FF669D;
        }
    }
`;