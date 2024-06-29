import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Image } from 'react-bootstrap';

function Header() {
    return (
        
            
      <div className={"m-3 p-3 border rounded bg-secondary"}>
            <Navbar expand="lg" >
        <Navbar.Brand ><Link to={"/"}><Image src="/images/logo_festival.png" alt="logo nation sound" width={"150px"} rounded /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <Nav.Link><Link to={"/"} style={{ textDecoration: 'none' }}><Button>ACCEUIL</Button></Link></Nav.Link>
            <Nav.Link> <Link to={"/Map"} style={{ textDecoration: 'none' }}><Button>CARTE</Button></Link></Nav.Link>
            <Nav.Link> <Link to={"/Programme"} style={{ textDecoration: 'none' }}><Button>PROGRAMME</Button></Link></Nav.Link>
            <Nav.Link> <Link to={"/Partenaires"}style={{ textDecoration: 'none' }}><Button>PARTENAIRES</Button></Link></Nav.Link>
            <Nav.Link target="_blank"  href="http://localhost/ns_hl_wp/questions/"><Button>FAQ</Button></Nav.Link>
            <Nav.Link target="_blank"  href="http://localhost/ns_hl_wp/boutique/"><Button>BOUTIQUE</Button></Nav.Link>           
          </Nav>
        </Navbar.Collapse>
    </Navbar>
      </div>
       
    );
};

export default Header;