import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import App from './App';
import Home from './components/Home';

const Routes = () => (
<BrowserRouter>
    <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/home' component={Home} />
    </Switch>
</BrowserRouter>
);

export default Routes;