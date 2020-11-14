import React from 'react';

import {useAuth} from '../contexts/auth';
import AppRoutes from './app.routes';
import DashboardRoutes from './dashboard.routes';
import AuthRoutes from './auth.routes';
import Loading from '../pages/Messages/LoadingScreen';

const Routes: React.FC = () => {
    const {signed, loading} = useAuth();

    if (loading) {
        return <Loading/>;
    }

    return (
        <>
            {signed ? <DashboardRoutes/> : <AuthRoutes/> }
            <AppRoutes/>
        </>
    );
}

export default Routes;