import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import {NavDropdown, Form, Button, FormControl, Navbar, Nav} from 'react-bootstrap';
const LandingPage = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <div id="header">
                <Header/>
            </div>
            <div>
                <Sidebar/>
            </div>
        </div>
    );
}

export default LandingPage;