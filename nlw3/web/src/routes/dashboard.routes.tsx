import React from 'react';
import { Route } from 'react-router-dom';

import OrphanageCreation from '../pages/Messages/OrphanageCreation';
import OrphanageExclusion from '../pages/Messages/OrphanageExclusion';
import Dashboard from '../pages/Dashboard';
import CreateOrphanage from '../pages/Dashboard/CreateOrphanage';
import EditOrphanage from '../pages/Dashboard/EditOrphanage';

const DashboardRoutes: React.FC = () => {
    return (
        <>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/dashboard/add" component={CreateOrphanage} />
            <Route exact path="/dashboard/orphanages/:id" component={() => <EditOrphanage mode='view'/>} />
            <Route path="/dashboard/orphanages/:id/edit" component={EditOrphanage} />
            <Route path="/dashboard/orphanages/:id/approve" component={() => <EditOrphanage mode='confirm'/>} />
            
            <Route path="/dashboard/orphanages/:id/remove" component={OrphanageExclusion} />
            <Route path="/dashboard/message/success" component={OrphanageCreation} />
        </>
    );
}

export default DashboardRoutes;