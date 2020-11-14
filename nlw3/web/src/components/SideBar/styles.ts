import styled from 'styled-components';

export const Container = styled.aside`
    position: fixed;
    height: 100%;
    padding: 32px 24px;
    background: linear-gradient(329.54deg, #15B6D6 0%, #15D6D6 100%);
  
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  
    img {
        width: 48px;
    }
  
    footer {

        a, button {
            margin: 0;
        }
    }

    .btn-group {

        a, button {
            margin: 15px 0 !important;
        }
    } 
`;