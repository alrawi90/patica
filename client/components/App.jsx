const React = require('react');
const SkillCategoryLabel = require('./SkillCategoryLabel');
const RoleLabel = require('./RoleLabel');
const Lego = require('./Lego');
const ReactBootstrap=require('react-bootstrap')
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      categories:[
      {skillCategoryName:'',skills:[],categoryImg:''},
      {skillCategoryName:'',skills:[],categoryImg:''},
      {skillCategoryName:'',skills:[],categoryImg:''},
      {skillCategoryName:'',skills:[],categoryImg:''},
      {skillCategoryName:'',skills:[],categoryImg:''},
      {skillCategoryName:'',skills:[],categoryImg:''}],
      roleName:'',lego:'',kewords:[]
    }
    this.setRoleProps=this.setRoleProps.bind(this)
    this.setLego=this.setLego.bind(this)
  }
  setRoleProps(roleName,keywords){

  }
  setLego(legoImg){this.setState({lego:legoImg})}
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


    return (
    <div>
      {navbarInstance}
      <ReactBootstrap.Grid >
      <ReactBootstrap.Row >
      <ReactBootstrap.Col md={12}>
       <RoleLabel setRoleProps={this.setRoleProps}/>
      </ReactBootstrap.Col>
      </ReactBootstrap.Row>
      <div style={{display:'flex',flexDirection:'row',justifyContent: 'space-around'}}>
         <div style={{display:'flex',flexDirection:'column',justifyContent: 'space-between'}} >
           <SkillCategoryLabel />
           <SkillCategoryLabel />
           <SkillCategoryLabel />
         </div>
         <div style={{display:'block'}} >
           <Lego setLego={this.setLego} currentLego={this.state.lego}/>
         </div>
         <div style={{display:'flex',flexDirection:'column',justifyContent: 'space-between'}} >
           <SkillCategoryLabel />
           <SkillCategoryLabel />
           <SkillCategoryLabel />

         </div>
      </div>
      </ReactBootstrap.Grid>
    </div>
    )
  }

}

module.exports = App
