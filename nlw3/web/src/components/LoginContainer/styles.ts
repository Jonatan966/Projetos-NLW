import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: grid;
    grid-template-columns: 1fr 0.5fr;

    .logo{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);

        .location {
            display: flex;
            flex-direction: column;

            margin-top: 75px;

            strong {
                font-weight: 800;
            }
        }

    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        position: relative;

        background: white;
        color: #8FA7B2;

        form {
            display: flex;
            flex-direction: column;
        }

        .backButton {
            position: absolute;
            top: 0;
            right: 0;

            background: #EBF2F5;
            border-radius: 16px;

            padding: 12px;
            margin: 15px;

            display: flex;
            justify-content: center;
            align-items: center;
        }

        h1 {
            color: #5C8599;

            width: 60%;
        }

        > *:not(a) {
            width: 70%;
        }

        .h-grid {
            display: flex;
            justify-content: space-between;

            margin: 15px 0;

            input{
                margin-right: 5px;
            }

            button {
                flex: 1;
                margin-top: 0 !important;
            }

            a {
                display: flex;
                align-items: center;
                justify-content: center;

                margin: 0 7.5px;
            }
        }

        button {
            background: #37C77F;
            color: white;

            border-radius: 20px;
            border: none;

            padding: 20px;
            margin-top: 15px;

            transition: all 0.5s;

            cursor: pointer;

            :hover {
                background: #37C77FAA;
                transition: all 0.5s;

            }
        }

        p {
            margin: 15px 0;
        }
    }
`;