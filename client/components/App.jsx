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
      {skillCategoryName:'Category Name',skills:['skill-1','skill-2','skill-3'],categoryImg:'client/assets/icons/1.png'},
      {skillCategoryName:'Category Name',skills:['skill-1','skill-2','skill-3'],categoryImg:''},
      {skillCategoryName:'Category Name',skills:['skill-1','skill-2','skill-3'],categoryImg:''},
      {skillCategoryName:'Category Name',skills:['skill-1','skill-2','skill-3'],categoryImg:''},
      {skillCategoryName:'Category Name',skills:['skill-1','skill-2','skill-3'],categoryImg:''},
      {skillCategoryName:'Category Name',skills:['skill-1','skill-2','skill-3'],categoryImg:''}],
      roleName:'role Name',lego:'',description:'bla bla bla bla bla bla bla bla bla bla bla bla bla bla ',
      keywords: ['keyword-1','keyword-2','keyword-3']
    }
    this.setRoleProps=this.setRoleProps.bind(this)
    this.setCategoryDetails=this.setCategoryDetails.bind(this)
    this.setLego=this.setLego.bind(this)
  }
  setRoleProps(roleName_,keywords_,description_){

    this.setState({
      roleName: roleName_, keywords: keywords_,description:description_
    });

  }
  setLego(legoImg){this.setState({lego:legoImg})}

  setCategoryDetails(id,categoryName,skills,iconUrl){
    let c=this.state.categories
    c[id-1].skillCategoryName=categoryName;
    c[id-1].skills=skills;
    c[id-1].categoryImg=iconUrl;
    this.setState({
      categories: c
    });
    console.log(id)
  }

  componentDidUpdate(){console.log(this.state.categories[0].categoryImg)}

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
       <RoleLabel setRoleProps={this.setRoleProps} roleName={this.state.roleName} keywords={this.state.keywords}
         description={this.state.description}
       />
      </ReactBootstrap.Col>
      </ReactBootstrap.Row>
      <div style={{display:'flex',flexDirection:'row',justifyContent: 'space-around'}}>
         <div style={{display:'flex',flexDirection:'column',justifyContent: 'space-between'}} >
           <SkillCategoryLabel
               id={1}
               setCategoryDetails={this.setCategoryDetails}
               skills={this.state.categories[0].skills}
               iconUrl={this.state.categories[0].categoryImg}
               categoryName={this.state.categories[0].skillCategoryName}
               />
           <SkillCategoryLabel
               id={2}
               setCategoryDetails={this.setCategoryDetails}
               skills={this.state.categories[1].skills}
               iconUrl={this.state.categories[1].categoryImg}
               categoryName={this.state.categories[1].skillCategoryName}
            />
            <SkillCategoryLabel
                id={3}
                setCategoryDetails={this.setCategoryDetails}
                skills={this.state.categories[2].skills}
                iconUrl={this.state.categories[2].categoryImg}
                categoryName={this.state.categories[2].skillCategoryName}
             />
         </div>
         <div style={{display:'block'}} >
           <Lego setLego={this.setLego} currentLego={this.state.lego}/>
         </div>
         <div style={{display:'flex',flexDirection:'column',justifyContent: 'space-between'}} >
         <SkillCategoryLabel
             id={4}
             setCategoryDetails={this.setCategoryDetails}
             skills={this.state.categories[3].skills}
             iconUrl={this.state.categories[3].categoryImg}
             categoryName={this.state.categories[3].skillCategoryName}
          />
          <SkillCategoryLabel
              id={5}
              setCategoryDetails={this.setCategoryDetails}
              skills={this.state.categories[4].skills}
              iconUrl={this.state.categories[4].categoryImg}
              categoryName={this.state.categories[4].skillCategoryName}
           />
           <SkillCategoryLabel
               id={6}
               setCategoryDetails={this.setCategoryDetails}
               skills={this.state.categories[5].skills}
               iconUrl={this.state.categories[5].categoryImg}
               categoryName={this.state.categories[5].skillCategoryName}
            />
         </div>
      </div>
      </ReactBootstrap.Grid>
    </div>
    )
  }

}

module.exports = App
