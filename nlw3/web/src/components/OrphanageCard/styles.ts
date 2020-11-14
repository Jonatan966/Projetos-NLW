import styled from 'styled-components';

export const Container = styled.div`
    width: 47.5%;

    background: #FFFFFF;
    color: #4D6F80;

    border: 1px solid #D3E2E5;
    border-radius: 20px;
    margin: 15px;

    .leaflet-container {
        border-radius: 20px;
    }

    label {
        display: flex;
        align-items: center;

        padding: 10px;

        h2 {
            flex: 1;
        }

        button, a {
            background: #EBF2F5;
        
            border-radius: 16px;
            border: none;

            margin: 5px;
            padding: 10px;

            display: flex;
            justify-content: center;
            align-items: center;

            cursor: pointer;
        }
    }
`;