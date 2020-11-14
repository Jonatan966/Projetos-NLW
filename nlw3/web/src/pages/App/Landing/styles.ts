import styled from 'styled-components';

import landingImg from '../../../images/landing.svg';

export const LandingContainer = styled.div`
    background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    .content-wrapper {
        position: relative;

        width: 100%;
        max-width: 1400px;

        height: 100%;
        max-height: 780px;

        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: space-between;

        background: url(${landingImg}) no-repeat 80% center;

        main {
            max-width: 350px;

            h1{
                font-size: 76px;
                font-weight: 900;
                line-height: 70px;
            }

            p{
                margin-top: 40px;
                font-size: 24px;
                line-height: 34px;
            }
        }

        .location {
            position: absolute;
            left: 350px;
            top: 0;

            font-size: 24px;
            line-height: 34px;

            display: flex;
            flex-direction: column;

            text-align: right;

            strong{
                font-weight: 800;
            }
        }

        .enter-app {
            position: absolute;
            right: 0;
            bottom: 0;

            width: 80px;
            height: 80px;
            background: #ffd666;
            border-radius: 30px;

            display: flex;
            justify-content: center;
            align-items: center;

            transition: background-color 0.2s;

            :hover {
                background: #96feff;
            }
        }

        .restrictButton {
            position: absolute;
            top: 0;
            right: 0;

            background: #12D4E0;
            color: #FFFFFF;
            text-decoration: none;

            border-radius: 20px;
            padding: 13px 40px;

            transition: all 0.5s;

            :hover {
                background: #96FEFF;
                color: #15C3D6;
            }
        }
    }
`;