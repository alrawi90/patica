
const React = require('react');
const SkillCategoryLabel = require('./SkillCategoryLabel');
const RoleLabel = require('./RoleLabel');
const Lego = require('./Lego');
const SkillCategory = require('./SkillCategory');
class Fork extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      roleId:'58f4660bf3958abbc84d199a',//show be a prop (set from the router)
      error:'' ,
      categories:[
      {name:'',skills:[],image:''},
      {name:'',skills:[],image:''},
      {name:'',skills:[],image:''},
      {name:'',skills:[],image:''},
      {name:'',skills:[],image:''},
      {name:'',skills:[],image:''},],
      roleName:'',lego:'',description:'',
      keywords: [],// each element is an object of  {id:1,text:'keyword-1'}
      suggestions:["Banana", "Mango", "Pear", "Apricot"],
      key:Date.now()
    }
    this.setRoleProps=this.setRoleProps.bind(this)
    this.onCategoryNameChanged=this.onCategoryNameChanged.bind(this)
    this.onCategoryImageChanged=this.onCategoryImageChanged.bind(this)
    this.onCategorySkillsChanged=this.onCategorySkillsChanged.bind(this)
    this.setLego=this.setLego.bind(this)
    this.create=this.create.bind(this)
    this.addNewCategory=this.addNewCategory.bind(this)
    this.removeCategory=this.removeCategory.bind(this)
    this.showAdvancedSettings=this.showAdvancedSettings.bind(this)
  }
  showAdvancedSettings(e){
   let factor=e.target.id
   this.refs['sc-' + factor].openModal(e)
  }

  addNewCategory(){
    let SkillCategory={name:'',skills:['','',''],image:''}
    let categories=this.state.categories
    categories.push(SkillCategory)
    this.setState({categories:categories})
  }

  removeCategory(e){

    let CategoryIndex=parseInt(e.target.id)-1
    let categories=this.state.categories
    categories.splice(CategoryIndex,1)
    this.setState({categories:categories})
     console.log(CategoryIndex+1 +' removed')
  }
  componentWillMount(){
      let app=this;
      console.log('forking ...')
      fetch('http://patica-role.mertdogar.com/role/'+this.state.roleId
          ).then(function(response) {
              return response.json();
            }).then(function(data) {
               let kwrds=data.keywords.map((item,index)=>{
                 return(
                   {id:index,text:item}
                 )
               })
              
               let categories=data.skillCategory.map((item,index)=>{
                 return(

                   {name:item.name,skills:item.skills,image:item.image}
                 )
               })
               app.setState({
                 roleName: data.name,
                 description:data.description,
                 lego:data.image,
                 keywords:kwrds,
                 categories:categories
               });
      })  .catch(function(error) {
    console.log(error);
  });

  }
  setRoleProps(roleName_,keywords_,description_){

    this.setState({
      roleName: roleName_, keywords: keywords_,description:description_
    });

  }
  setLego(legoImg){this.setState({lego:legoImg})}

  onCategoryNameChanged(id,categoryName){
    let categories=this.state.categories
    categories[id-1].name=categoryName;
    this.setState({
      categories: categories
    });
  }
  onCategoryImageChanged(id,image){
    let categories=this.state.categories
    categories[id-1].image=image;
    this.setState({
      categories: categories
    });
  }
  onCategorySkillsChanged(id,skills){
    let categories=this.state.categories
    categories[id-1].skills=skills;
    this.setState({
      categories: categories
    });
  }
  //componentDidUpdate(){console.log(this.state.categories[0].categoryImg)}

  create(){
      console.log('posting .....')
      const opts={}
      opts.name=this.state.roleName
      opts.description=this.state.description
      opts.image=this.state.lego
      opts.keywords=this.state.keywords.map((item,index)=>{return(item.text)})//['a','b','c']
      opts.skillCategory=[]
      opts.skillCategory=[1,2,3,4,5,6].map((item,index)=>{
        return(
        {         name:this.state.categories[index].name,
                  skills:this.state.categories[index].skills,
                  image:this.state.categories[index].image
                }
      )})
      console.log(opts)
      const app=this
      fetch('http://patica-role.mertdogar.com/role', {
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

    const items=this.state.categories.map((category, index) =>{

        return(

              <div className="item" key={index} >
                <button id={index+1} onClick={this.removeCategory}>-</button>
                <button id={index+1} onClick={this.showAdvancedSettings}>#</button>
                <SkillCategory 
                  id={index+1} 
                  ref={'sc-'+(index+1)} 
                  onAdvancedEdit={this.onAdvancedEdit}
                  skills={category.skills}
                  categoryName={category.name}
                  />
                <SkillCategoryLabel
                  key={index}
                  id={index+1}
                  onCategoryNameChanged={this.onCategoryNameChanged}
                  onCategoryImageChanged={this.onCategoryImageChanged}
                  onCategorySkillsChanged={this.onCategorySkillsChanged}
                  skills={category.skills}
                  iconUrl={category.image}
                  categoryName={category.name}
                />
              </div>

        ) })

    return (
      <div className='col' >
          <div className='row' style={{justifyContent:'center'}}>
           <div className='' >
              <RoleLabel setRoleProps={this.setRoleProps} roleName={this.state.roleName} keywords={this.state.keywords}
                description={this.state.description} suggestions={this.state.suggestions}
              />
          </div>
          <div className='' style={{float:'right',backgroundColor:''}}>
             <button onClick={this.addNewCategory} >Add New Category</button>
          </div>
         </div>
          <div className='main-container' >
             <div className="col-left" >
                 {items.map((item,index)=>{if(index % 2==0) return (item)})}
             </div>
             <div className="col-center" >

                <div className="item" >
                  <Lego setLego={this.setLego} currentLego={this.state.lego}/>
                </div>

            </div>

             <div className="col-right" >
              {items.map((item,index)=>{if(index % 2 >0) return (item)})}
             </div>
          </div>
          <div className='row' style={{justifyContent:'center'}}>
              <div className="item" >
                 <button onClick={this.create}>Create Role</button>
              </div>
              <div className="item" >
                 <label style={{color:'red',fontSize:'12px'}}>{this.state.error}</label>
              </div>
          </div>
          <div className='row' style={{justifyContent:'center'}}>
              <div className="item" >
                 <label style={{color:'red',fontSize:'12px'}}>{this.state.error}</label>
              </div>
          </div>
        </div>
    )
  }

}

module.exports = Fork