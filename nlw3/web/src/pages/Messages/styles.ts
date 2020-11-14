import styled from 'styled-components';

interface ConfirmationsProps {
    image?: string;
    backgroundColor?: string;
    btnDefaultColor?: string;
    btnHoverColor?: string;
}

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    background: ${(props: ConfirmationsProps) => props.backgroundColor};

    width: 100vw;
    height: 100vh;

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background: url(${(props: ConfirmationsProps) => props.image}) no-repeat 80% center;

        width: 100%;
        max-width: 1400px;

        height: 100%;
        max-height: 780px; 

        padding-right: 550px;

        p{
            max-width: 350px;
            text-align: center;
            margin: 15px;
        }

        a, button{
            background: ${(props: ConfirmationsProps) => props.btnDefaultColor};
            
            color: white;
            text-decoration: none;

            border: none;
            border-radius: 20px;
            padding: 13px 40px;
            margin: 5px;

            transition: all 0.5s;

            cursor: pointer;

            :hover{
                background: ${(props: ConfirmationsProps) => props.btnHoverColor};
            }
        }

        .no {
            background: #31B272;

            :hover {
                background: #3BD689;
            }
        }
    }
`;