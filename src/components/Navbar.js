import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.css';

const Navigation = () => {
    return (
        <Navbar bg="light" expand="lg" className="justify-content-center">
            <Nav className="navbar-nav">
                <Nav.Link as={Link} to="/new-word">新词</Nav.Link>
                <Nav.Link as={Link} to="/game">游戏</Nav.Link>
                <Nav.Link as={Link} to="/quiz">测验</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default Navigation;
