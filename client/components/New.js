

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
      keywords: [{id:1,text:'keyword-1'},{id:1,text:'keyword-2'},{id:1,text:'keyword-3'}],
      suggestions:["Banana", "Mango", "Pear", "Apricot"]
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

  create(){
      const opts={}
      opts.name=this.state.roleName
      opts.description=this.state.description
      opts.image=this.state.lego
      opts.keywords=this.state.keywords.map((item,value)=>{return(value)})//['a','b','c']
      opts.skillCategory=
          [
            // {
            //   name:this.state.categories[0].skillCategoryName,
            //   skills:this.state.categories[0].skills,
            //   image:this.state.categories[0].categoryImg
            // }
          ]
      opts.skillCategory=[1,2,3,4,5,6,7].map((item,index)=>{
        return(
        {         name:this.state.categories[index].skillCategoryName,
                  skills:this.state.categories[index].skills,
                  image:this.state.categories[index].categoryImg
                }
      )})

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
             console.log('Created Row:', data);
     });
  }

  render() {
    const template = [1,2,3,4,5,6,7].map((id,index)=>{
      return(
       if(id <4){
         <div style={{display:'flex',flexDirection:'column',justifyContent: 'space-between'}} >
         <SkillCategoryLabel
             id={id}
             setCategoryDetails={this.setCategoryDetails}
             skills={this.state.categories[index].skills}
             iconUrl={this.state.categories[index].categoryImg}
             categoryName={this.state.categories[index].skillCategoryName}
             />
       }
       else if (id==4) {
         </div>
         <div style={{display:'block'}} >
           <Lego setLego={this.setLego} currentLego={this.state.lego}/>
         </div>
       }
       else{
         <div style={{display:'flex',flexDirection:'column',justifyContent: 'space-between'}} >
         <SkillCategoryLabel
             id={id}
             setCategoryDetails={this.setCategoryDetails}
             skills={this.state.categories[index].skills}
             iconUrl={this.state.categories[index].categoryImg}
             categoryName={this.state.categories[index].skillCategoryName}
             />
       }
       </div>
    )}
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
         {template}
      </div>
      </ReactBootstrap.Grid>
    </div>
    )
  }

}

module.exports = App
