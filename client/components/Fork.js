
const React = require('react');
const SkillCategoryLabel = require('./SkillCategoryLabel');
const RoleLabel = require('./RoleLabel');
const Lego = require('./Lego');
const SkillCategory = require('./SkillCategory');
class Fork extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      roleId:'59044285f3958abbc84d19a1',//show be a prop (set from the router)
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
    this.setRoleName=this.setRoleName.bind(this)
    this.setRoleDescription=this.setRoleDescription.bind(this)
    this.setRoleKeywords=this.setRoleKeywords.bind(this)
    this.onCategoryNameChanged=this.onCategoryNameChanged.bind(this)
    this.onCategoryImageChanged=this.onCategoryImageChanged.bind(this)
    this.onCategorySkillsChanged=this.onCategorySkillsChanged.bind(this)
    this.setLego=this.setLego.bind(this)
    this.create=this.create.bind(this)
    this.addNewCategory=this.addNewCategory.bind(this)
    this.removeCategory=this.removeCategory.bind(this)
    this.onRoleKeywordsDelete=this.onRoleKeywordsDelete.bind(this)
    this.showAdvancedSettings=this.showAdvancedSettings.bind(this)
  }
  showAdvancedSettings(e){
   e.stopPropagation()
   let factor=e.target.id.split('-')[1];
   this.refs['sc-' + factor].openModal(e)
  }

  addNewCategory(){
    let SkillCategory={name:'',skills:['','',''],image:''}
    let categories=this.state.categories
    categories.push(SkillCategory)
    this.setState({categories:categories})
  }

  removeCategory(e){
    
    let CategoryIndex=parseInt(e.target.id.split('-')[1])-1
    let categories=this.state.categories
    categories.splice(CategoryIndex,1)// remove Category
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
  setRoleName(roleName){

    this.setState({
      roleName: roleName
    });

  }
    
  setRoleDescription(description){

    this.setState({
      description:description
    });

  }
  
  setRoleKeywords(keyword){

    const keywords = [ ...this.state.keywords ];
    let t=this.state.keywords.map((obj,i)=>obj.text)
    //console.log('keywords ##',t)
    if(! t.includes(keyword)) {
        this.setState({
          keywords: [
            ...this.state.keywords,
            {
              id: keywords.length + 1,
              text: keyword
            }
          ],key:Math.random()
        });
      }

  }
  onRoleKeywordsDelete(i){

    this.setState({
      keywords: this.state.keywords.filter((tag, index) => index !== i)
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
                <button id={`removeBtn-${index+1}`} onClick={this.removeCategory}><i id={`faRemoveBtn-${index+1}`} className="fa fa-remove"></i></button>
                <button id={`editBtn-${index+1}`} onClick={this.showAdvancedSettings}><i id={`faEditBtn-${index+1}`} className="fa fa-edit"></i></button>
                <SkillCategory 
                  id={index+1} 
                  ref={'sc-'+(index+1)} 
                  onAdvancedEdit={this.onAdvancedEdit}
                  onCategoryNameChanged={this.onCategoryNameChanged}
                  onCategorySkillsChanged={this.onCategorySkillsChanged}
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

    items.push(          
        <div className='' key={Date.now()} style={{position:'relative'}}>
             <button onClick={this.addNewCategory} alt='add new category' ><i className="fa fa-plus-circle"></i> New Category</button>
          </div>)
    return (
      <div className='col' >
          <div className='row' style={{justifyContent:'center'}}>
           <div className='' >
              <RoleLabel 
                 setRoleName={this.setRoleName} 
                 setRoleDescription={this.setRoleDescription}
                 setRoleKeywords={this.setRoleKeywords}
                 onRoleKeywordsDelete={this.onRoleKeywordsDelete}
                 roleName={this.state.roleName} 
                 keywords={this.state.keywords}
                 description={this.state.description} 
                 suggestions={this.state.suggestions}
              />
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
