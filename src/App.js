import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import NavBar from './Components/NavBar';
import Switcher from './Components/Switcher';

function App() {
    return (
        <div>
          <Router>
            <NavBar />
            <Switcher />
          </Router>
        </div>
    );
}

export default App;
