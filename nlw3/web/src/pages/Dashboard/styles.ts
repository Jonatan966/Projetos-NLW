import styled from 'styled-components';

export const Container = styled.div`
    min-height: 100vh;
    display: flex;

    main {
        flex: 1;
        display: flex;
        flex-direction: column;

        margin-left: 96px;
        padding: 48px;

        .orphanage-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;

            flex: 1;
        }

        .orphanages-header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            position: relative;

            color: #4D6F80;
            padding: 0 30px;
            margin-bottom: 15px;

            ::after {
                content: '';
        
                position: absolute;
                bottom: 0;

                width: 96.5%;
                height: 2px;

                background: #D3E2E5;
            }
        }
    }
`;

export const ManipulateOrphanageContainer = styled.div`
    display: flex;

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        > span {
            color: gray;
            text-align: center;

            margin: 32px;
        }
    }
`;