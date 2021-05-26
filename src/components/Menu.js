import React from 'react';
import {withRouter}  from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {Form, FormControl} from "react-bootstrap";
import { Button } from "react-bootstrap";

class Menu extends React.Component 
{
    getNavLinkClass = (path) => 
    {
        return this.props.location.pathname === path ? 'active' : '';
    }

  render() 
  {
    return (
    <div className="Menu">

  <Navbar bg="light" expand="lg">
   <Navbar.Brand href="#home">Repositorio ITZ</Navbar.Brand>
   <Navbar.Toggle aria-controls="basic-navbar-nav" />
   <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="Home">Inicio</Nav.Link>
      <Nav.Link href="LoadFile">Subir archivos</Nav.Link>
      <Nav.Link href="Logout">Cerrar sesión</Nav.Link>
      <NavDropdown title="Categorías" id="basic-nav-dropdown">
        <NavDropdown.Item href="#">Videos</NavDropdown.Item>
        <NavDropdown.Item href="#">Imagenes</NavDropdown.Item>
        <NavDropdown.Item href="#">Documentos</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Buscar</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
    </div>
  );
}
Menu = withRouter(Menu);
};

export default Menu;