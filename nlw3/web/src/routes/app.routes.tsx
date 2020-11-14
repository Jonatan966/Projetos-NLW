import React from 'react';
import { Route } from 'react-router-dom';

import Landing from '../pages/App/Landing';
import Orphanage from '../pages/App/Orphanage';
import OrphanagesMap from '../pages/App/OrphanagesMap';

const AppRoutes: React.FC = () => {
    return (
        <>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/map" component={OrphanagesMap}/>
            <Route path="/orphanages/:id" component={Orphanage}/>
        </>
    );
}

export default AppRoutes;