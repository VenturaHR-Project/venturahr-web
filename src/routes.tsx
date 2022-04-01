import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={SignUp} />
        </BrowserRouter>
    )
}

export default Routes