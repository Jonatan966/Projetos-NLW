import React from 'react';
import { Route } from 'react-router-dom';

import ForgetPassword from "../pages/Auth/ForgetPassword";
import Login from "../pages/Auth/Login";
import Register from '../pages/Auth/Register';
import { UserCreation } from '../pages/Messages/UserCreation';

const AuthRoutes: React.FC = () => {
    return (
        <>
            <Route path="/login" component={Login}/>
            <Route path="/forget" component={ForgetPassword}/>
            <Route path="/register" component={Register}/>
            <Route exact path="/register/sucess" component={UserCreation}/>
        </>
    );
}

export default AuthRoutes;