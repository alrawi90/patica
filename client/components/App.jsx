const React = require('react');
const Item = require('./Item');
const RoleLabel = require('./RoleLabel');
const Lego = require('./Lego');
const ReactBootstrap=require('react-bootstrap')
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
     const navbarInstance = (
      <ReactBootstrap.Navbar inverse collapseOnSelect>
        <ReactBootstrap.Navbar.Header>
          <ReactBootstrap.Navbar.Brand>
          <a href="#"><img src="https://facebook.github.io/react/img/logo.svg" width="40" height="40"/>React</a>
          </ReactBootstrap.Navbar.Brand>
          <ReactBootstrap.Navbar.Toggle />
        </ReactBootstrap.Navbar.Header>
        <ReactBootstrap.Navbar.Collapse>
          <ReactBootstrap.Nav>
            <ReactBootstrap.NavItem eventKey={1} href="#">Link</ReactBootstrap.NavItem>
            <ReactBootstrap.NavItem eventKey={2} href="#">Link</ReactBootstrap.NavItem>
            <ReactBootstrap.NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <ReactBootstrap.MenuItem eventKey={3.1}>Action</ReactBootstrap.MenuItem>
              <ReactBootstrap.MenuItem eventKey={3.2}>Another action</ReactBootstrap.MenuItem>
              <ReactBootstrap.MenuItem eventKey={3.3}>Something else here</ReactBootstrap.MenuItem>
              <ReactBootstrap.MenuItem divider />
              <ReactBootstrap.MenuItem eventKey={3.3}>Separated link</ReactBootstrap.MenuItem>
            </ReactBootstrap.NavDropdown>
          </ReactBootstrap.Nav>
          <ReactBootstrap.Nav pullRight>
            <ReactBootstrap.NavItem eventKey={1} href="#">Link Right</ReactBootstrap.NavItem>
            <ReactBootstrap.NavItem eventKey={2} href="#">Link Right</ReactBootstrap.NavItem>
          </ReactBootstrap.Nav>
        </ReactBootstrap.Navbar.Collapse>
      </ReactBootstrap.Navbar>
);

    const items =[1,2,3].map((e,i)=>{
         return(
          <ReactBootstrap.Col key={i} md={4}>
              <Item key={i}/>
          </ReactBootstrap.Col>
               )
    })
    return (
    <div>
      {navbarInstance}
      <ReactBootstrap.Grid >
      <ReactBootstrap.Row >
      <ReactBootstrap.Col md={12}>
       <RoleLabel />
      </ReactBootstrap.Col>
      </ReactBootstrap.Row>
      <div style={{display:'flex',flexDirection:'row',justifyContent: 'space-around'}}>
         <div style={{display:'flex',flexDirection:'column',justifyContent: 'space-between'}} >
           <Item />
           <Item />
           <Item />
         </div>
         <div style={{display:'flex',flexDirection:'column'}} >
           <Item />
           <Item />
           <Item />
         </div>
         <div style={{display:'flex',flexDirection:'column',}} >
           <Item />
           <Item />
           <Item />
         </div>
      </div>
      </ReactBootstrap.Grid>
    </div>
    )
  }

}

module.exports = App
