import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Image } from 'react-bootstrap';

function Header() {
    return (
        
            
      <div >
            <Navbar expand="lg" className={"mb-5 p-3 border rounded bg-dark"}>
        <Navbar.Brand ><Link to={"/"}><Image src="/images/logo_festival.png" alt="logo nation sound" width={"150px"} rounded /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <Nav.Link><Link to={"/"} style={{ textDecoration: 'none' }}><Button className='btn-light'>ACCEUIL</Button></Link></Nav.Link>
            <Nav.Link> <Link to={"/Map"} style={{ textDecoration: 'none' }}><Button className='btn-light'>CARTE</Button></Link></Nav.Link>
            <Nav.Link> <Link to={"/Programme"} style={{ textDecoration: 'none' }}><Button className='btn-light'>PROGRAMME</Button></Link></Nav.Link>
            <Nav.Link> <Link to={"/Partenaires"}style={{ textDecoration: 'none' }}><Button className='btn-light'>PARTENAIRES</Button></Link></Nav.Link>
            <Nav.Link> <Link to={"/Faq"}style={{ textDecoration: 'none' }}><Button className='btn-light'>FAQ</Button></Link></Nav.Link>            
            <Nav.Link target="_blank"  href="https://nationsoundluc.rf.gd/wpdb/boutique/"><Button className='btn-light'>BOUTIQUE</Button></Nav.Link>           
          </Nav>
        </Navbar.Collapse>
    </Navbar>
      </div>
       
    );
};

export default Header;