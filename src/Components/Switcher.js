import React, { Component } from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';

import Bills from '../Pages/Bills';
import Billing from '../Pages/Billing';

class Switcher extends Component {
    render() {
        return(
            <Switch>
              <Route path="/billing">
                <Billing />
              </Route>
              <Route path="/bills" >
                <Bills />
              </Route>
            </Switch>        
        );
    }
}

export default Switcher;