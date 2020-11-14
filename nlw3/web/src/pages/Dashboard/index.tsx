import React, { useState } from 'react';
import DashboardSideBar from '../../components/DashboardSideBar';
import OrphanagesList from './OrphanagesList/OrphanagesList';
import PendingList from './PendingList/PendingList';

import {Container} from './styles';

export default function Dashboard() {
    const [activeMenu, setActiveMenu] = useState(0);
    const menus = [<OrphanagesList/>, <PendingList/>];

    return (
        <Container>
            <DashboardSideBar 
                activeMenu={activeMenu} 
                changeMenu={(menu) => {setActiveMenu(menu)}}
            />

            <main>
                {menus[activeMenu]}
            </main>
        </Container>
    );
}