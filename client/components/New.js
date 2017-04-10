
const React = require('react');
const SkillCategoryLabel = require('./SkillCategoryLabel');
const RoleLabel = require('./RoleLabel');
const Lego = require('./Lego');
const ReactBootstrap=require('react-bootstrap')
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      error:'' ,
      categories:[
      {skillCategoryName:'Category Name',skills:['skill-1','skill-2','skill-3'],categoryImg:'client/assets/icons/1.png'},
      {skillCategoryName:'Category Name',skills:['skill-1','skill-2','skill-3'],categoryImg:''},
      {skillCategoryName:'Category Name',skills:['skill-1','skill-2','skill-3'],categoryImg:''},
      {skillCategoryName:'Category Name',skills:['skill-1','skill-2','skill-3'],categoryImg:''},
      {skillCategoryName:'Category Name',skills:['skill-1','skill-2','skill-3'],categoryImg:''},
      {skillCategoryName:'Category Name',skills:['skill-1','skill-2','skill-3'],categoryImg:''}],
      roleName:'role Name',lego:'',description:'bla bla bla bla bla bla bla bla bla bla bla bla bla bla ',
      keywords: [{id:1,text:'keyword-1'},{id:1,text:'keyword-2'},{id:1,text:'keyword-3'}],
      suggestions:["Banana", "Mango", "Pear", "Apricot"]
    }
    this.setRoleProps=this.setRoleProps.bind(this)
    this.setCategoryDetails=this.setCategoryDetails.bind(this)
    this.setLego=this.setLego.bind(this)
    this.create=this.create.bind(this)
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

  create(){
      console.log('posting .....')
      const opts={}
      opts.name=this.state.roleName
      opts.description=this.state.description
      opts.image=this.state.lego
      opts.keywords=this.state.keywords.map((item,index)=>{return(item.text)})//['a','b','c']
      opts.skillCategory=
          [
            // {
            //   name:this.state.categories[0].skillCategoryName,
            //   skills:this.state.categories[0].skills,
            //   image:this.state.categories[0].categoryImg
            // }
          ]
      opts.skillCategory=[1,2,3,4,5,6].map((item,index)=>{
        return(
        {         name:this.state.categories[index].skillCategoryName,
                  skills:this.state.categories[index].skills,
                  image:this.state.categories[index].categoryImg
                }
      )})
      const app=this
      fetch('http://localhost:3002/role', {
       method: 'post',
       headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
       body: JSON.stringify(opts)
           }).then(function(response) {
             return response.json();
           }).then(function(data) {
              app.setState({ error: data.error.message });

     });
  }
  render() {

    return (
    <div>
      <ReactBootstrap.Grid >
      <ReactBootstrap.Row >
      <ReactBootstrap.Col md={12}>
       <RoleLabel setRoleProps={this.setRoleProps} roleName={this.state.roleName} keywords={this.state.keywords}
         description={this.state.description} suggestions={this.state.suggestions}
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
       <ReactBootstrap.Row >
        <ReactBootstrap.Col md={6} style={{textAlign:'right',marginTop:'20px'}}>
          <button  onClick={this.create}>Create Role</button>
        </ReactBootstrap.Col>
        <ReactBootstrap.Col md={6} style={{textAlign:'left',marginTop:'20px'}}>
          <h6 id="msg" style={{color:'red',marginLeft:'5px',backgroundColor:'silver',display:'inline-block'}}>{this.state.error}</h6>
        </ReactBootstrap.Col>
       </ReactBootstrap.Row>
      </ReactBootstrap.Grid>
    </div>
    )
  }

}

module.exports = App
